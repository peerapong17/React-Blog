import Blog from "../../models/blog.js";

const getBlogsBySearch = async (req, res) => {
    const { page, searchQuery, tags } = req.query;
  
    console.log(tags)
  
    try {
      const title = new RegExp(searchQuery, "i");
  
      const LIMIT = 6;
      const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
  
      const blogs = await Blog.find({
        $or: [{ title }, { tags: { $in: tags?.split(",") } }],
      })
        .sort({ _id: -1 })
        .limit(LIMIT)
        .skip(startIndex);
  
      res.json({
        data: blogs,
        currentPage: Number(page),
        numberOfPages: Math.ceil(blogs.length / LIMIT),
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export default getBlogsBySearch