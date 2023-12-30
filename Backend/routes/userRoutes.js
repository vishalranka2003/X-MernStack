import express from "express";
import {
  signUpUser,
  logInUser,
  logOutUser,
  followUnFollowUser,
  updateUser,
  getUserProfile,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoutes.js";
const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.post("/signup", signUpUser);
router.post("/login", logInUser);
router.post("/logout", logOutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.post("/update/:id", protectRoute, updateUser);

export default router;
