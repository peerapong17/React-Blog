import Blog from "../../models/blog.js";

const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await Blog.findById(id);

  post.comments.push(value);

  const updatedPost = await Blog.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export default commentPost;
