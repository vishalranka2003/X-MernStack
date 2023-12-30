import express from "express";
import {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPost,
} from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoutes.js";

const router = express.Router();

router.get("/:postId", getPost);
router.get("/feed/:postId", protectRoute, getFeedPost);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:postId", protectRoute, deletePost);
router.post("/like/:postId", protectRoute, likeUnlikePost);
router.post("/reply/:postId", protectRoute, replyToPost);
export default router;
