import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_BLOG,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
} from "../action-types/actionTypes";
import * as api from "../../api/index";

export const getBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchBlog(id);

    dispatch({ type: FETCH_BLOG, payload: { blog: data } });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getBlogs = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchBlogs(page);

    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getUserblogs = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchUserBlogs(page);

    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getBlogsBySearch = (searchQuery) => async (dispatch) => {
  console.log(searchQuery)
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchBlogsBySearch(searchQuery);

    console.log(data)

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createBlog = (blog, history) => async (dispatch) => {
  const formData = new FormData();
  formData.append("title", blog.title);
  formData.append("message", blog.message);
  formData.append("tags", blog.tags);
  formData.append("image", blog.imageFile);

  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createBlog(formData);

    dispatch({ type: CREATE, payload: data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const updateBlog = (id, blog) => async (dispatch) => {
  const formData = new FormData();
  formData.append("title", blog.title);
  formData.append("message", blog.message);
  formData.append("tags", blog.tags);

  if (blog.imageFile != null) {
    formData.append("image", blog.imageFile);
  }

  try {
    const { data } = await api.updateBlog(id, formData);

    console.log(data);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likeBlog = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  try {
    const { data } = await api.likeBlog(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentBlog = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await await api.deleteBlog(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
