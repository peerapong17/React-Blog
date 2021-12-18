import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchBlog = (id) => API.get(`/blogs/${id}`);
export const fetchBlogs = (page) => API.get(`/blogs?page=${page}`);
export const fetchUserBlogs = (page) => API.get(`/blogs/user?page=${page}`);
export const fetchBlogsBySearch = (searchQuery) =>
  API.get(
    `/blogs/search?page=${searchQuery.page}&searchQuery=${searchQuery.search}&tags=${
      searchQuery.tags
    }`
  );
export const createBlog = (newblog) => API.post("/blogs", newblog);
export const likeBlog = (id) => API.patch(`/blogs/${id}/likeBlog`);
export const comment = (value, id) =>
  API.post(`/blogs/${id}/commentBlog`, { value });
export const updateBlog = (id, updatedBlog) =>
  API.patch(`/blogs/${id}`, updatedBlog);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

export const enterEmail = (formData) => API.post("password/enter-email", formData)
