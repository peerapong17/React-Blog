import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    imageUrl: String,
    imagePath: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
  },
  { timestamps: true }
);

var Blog = mongoose.model("Blog", blogSchema);

export default Blog;
