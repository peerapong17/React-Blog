import Blog from "../../models/blog.js";

const getBlog = async (req, res) => {
    const { id } = req.params;
  
    try {
      const post = await Blog.findById(id);
  
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export default getBlog