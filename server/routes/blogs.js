import express from "express";

import {
  getBlogs,
  getUserBlogs,
  getBlogsBySearch,
  getBlog,
  createBlog,
  updateBlog,
  likeBlog,
  commentBlog,
  deleteBlog,
} from "../controllers/blog/index.js";
import fileManager from "../helpers/fileManager.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/search", getBlogsBySearch);
router.get("/", getBlogs);
router.get("/user", auth, getUserBlogs);
router.get("/:id", getBlog);

router.post("/", auth, fileManager, createBlog);
router.patch("/:id", auth, fileManager, updateBlog);
router.delete("/:id", auth, deleteBlog);
router.patch("/:id/likeBlog", auth, likeBlog);
router.post("/:id/commentBlog", commentBlog);

export default router;
