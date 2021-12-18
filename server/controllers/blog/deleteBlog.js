import mongoose from "mongoose";
import Blog from "../../models/blog.js";

const deleteBlog = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
  
    await Blog.findByIdAndRemove(id);
  
    res.json({ message: "Post deleted successfully." });
  };

  export default deleteBlog