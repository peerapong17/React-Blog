import Blog from "../../models/blog.js";

const getBlogs = async (req, res) => {
    const { page } = req.query;
  
    try {
      const LIMIT = 6;
      const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
  
      const total = await Blog.countDocuments({});
      const blogs = await Blog.find()
        .sort({ createdAt: -1 })
        .limit(LIMIT)
        .skip(startIndex);
  
      res.json({
        data: blogs,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export default getBlogs