import mongoose from "mongoose";
import fs from "fs";
import Blog from "../../models/blog.js";

const updateBlog = async (req, res) => {
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

  export default updateBlog