import express from "express";

import {
  getPosts,
  getUserPosts,
  getPostsBySearch,
  getPost,
  createPost,
  updatePost,
  likePost,
  commentPost,
  deletePost,
} from "../controllers/posts.js";
import fileManager from "../helpers/fileManager.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/user", auth, getUserPosts);
router.get("/:id", getPost);

router.post("/", auth, fileManager, createPost);
router.patch("/:id", auth, fileManager, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", commentPost);

export default router;
