import Blog from "../../models/blog.js";

 const createBlog = async (req, res) => {
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

  export default createBlog