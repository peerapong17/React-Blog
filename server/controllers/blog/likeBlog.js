import mongoose from "mongoose";
import Blog from "../../models/blog.js";

const likeBlog = async (req, res) => {
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

  export default likeBlog