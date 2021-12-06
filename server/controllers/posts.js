import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import Blog from "../models/blog.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await Blog.countDocuments({});
    const posts = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await Blog.countDocuments({});
    const posts = await Blog.find({ creator: req.userId })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { page, searchQuery, tags } = req.query;

  console.log(tags)

  try {
    const title = new RegExp(searchQuery, "i");

    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const posts = await Blog.find({
      $or: [{ title }, { tags: { $in: tags?.split(",") } }],
    })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(posts.length / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Blog.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const imageUrl =
    req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;

  console.log(imageUrl);

  console.log(req.file.filename);

  const newBlog = new Blog({
    ...req.body,
    creator: req.userId,
    imagePath: req.file.filename,
    imageUrl,
  });

  try {
    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      // return res.status(404).send(`No post with id: ${id}`);
      throw new Error(`No post with id: ${id}`);

    // const existingBlog = await Blog.findById(id);

    var existingBlog = null;

    const isEmpty = (obj) => {
      for (var x in obj) {
        return false;
      }
      return true;
    };

    if (isEmpty(req.file)) {
      existingBlog = await Blog.findByIdAndUpdate(id, {
        ...req.body,
      });
    } else {
      const imageUrl =
        req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;

      existingBlog = await Blog.findByIdAndUpdate(
        id,
        {
          ...req.body,
          imageUrl,
          imagePath: req.file.filename,
        },
        { new: false }
      );

      const filePath = process.cwd() + "/images/" + existingBlog.imagePath;

      fs.unlinkSync(filePath);
    }

    res.status(200).json(existingBlog);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Blog.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await Blog.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await Blog.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await Blog.findById(id);

  post.comments.push(value);

  const updatedPost = await Blog.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export default router;
