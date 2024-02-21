import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";

const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let { img } = req.body;
    if (!postedBy || !text) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    const user = await User.findById(postedBy);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const max_length = 500;
    if (text.length > max_length) {
      return res.status(400).json({
        error: `Text length should be less than ${max_length} characters`,
      });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }
    const newPost = new Post({ postedBy, text, img });
    await newPost.save();
    res.status(201).json({ message: "Post created succesfully ", newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeedPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userFollowing = user.following;
    const feedPosts = await Post.find({
      postedBy: { $in: userFollowing },
    }).sort({ createdAt: -1 });
    res.status(200).json(feedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized to deletePost" });
    }
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const userId = req.user._id;
    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      await post.likes.pull(userId);
      res.status(200).json({ Message: "Post unliked succesfully" });
    } else {
      await post.likes.push(userId);
      res.status(200).json({ Message: "Post liked succesfully" });
    }
    post.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const replyToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const post = await Post.findById(postId);
    const user = await User.findById(req.user._id);
    const userName = user.username;
    const profilePic = user.profilePic;

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (!text) {
      return res.status(404).json({ error: "Text field is required" });
    }
    const newReply = {
      userId: user._id,
      text,
      profilePic,
      userName,
    };
    await post.replies.push(newReply);
    await post.save();
    res.status(200).json({ message: "Reply added succesfully", newReply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPost,
};
