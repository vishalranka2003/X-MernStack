import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenSetCookies from "../utils/helpers/generateTokenSetCookies.js";

const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    // Get user by username from database
    const user = await User.findOne({ username: username })
      .select("-password")
      .select("-updatedAt")
      .select("-createdAt");
    if (!user)
      return res
        .status(400)
        .json({ error: "User with given username not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in UpdateUser: ", err.message);
  }
};

const signUpUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      const existingFields = [];
      if (user.email === email) {
        existingFields.push("email");
      }
      if (user.username === username) {
        existingFields.push("username");
      }
      const errorMessage = `User with ${existingFields.join(
        " and "
      )} already exists`;
      return res.status(400).json({ error: errorMessage });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      generateTokenSetCookies(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        profilePic: newUser.profilePic, 
        // followers: newUser.followers,
        // following: newUser.following,
        bio: newUser.bio,
        isFrozen: newUser.isFrozen,
        createdAt: newUser.createdAt,
      });
    } else {
      res.status(400).json({ error: "Invalid User daetails" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logInUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user?.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid password" });
      }
    }
    if (!user) {
      return res.status(400).json({ error: "Invalid Username" });
    }
    generateTokenSetCookies(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      profilePic: user.profilePic,
      // followers: user.followers,
      // following: user.following,
      bio: user.bio,
      isFrozen: user.isFrozen,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logOutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged Out succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);

    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ error: "You cannot follow/unfollow yourself" });

    if (!userToModify || !currentUser)
      return res.status(400).json({ error: "User not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in followUnFollowUser: ", err.message);
  }
};

const updateUser = async (req, res) => {
  const { email, name, username, bio, profilePic, password } = req.body;
  console.log(username);
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);

    if (req.params.id !== userId.toString())
      return res.status(400).json({ error: "U cant update others profiel" });
    if (!user)
      return res.status(400).json({ error: "User with given id not found" });
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;
    user = await user.save();
    res.status(200).json({ message: "User details updated sucessfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in UpdateUser: ", err.message);
  }
};

export {
  signUpUser,
  logInUser,
  logOutUser,
  followUnFollowUser,
  updateUser,
  getUserProfile,
};
