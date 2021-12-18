import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BLOG, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../action-types/actionTypes';

export default (state = { isLoading: true, blogs: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        blogs: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, blogs: action.payload.data };
    case FETCH_BLOG:
      return { ...state, post: action.payload.post };
    case LIKE:
      return { ...state, blogs: state.blogs.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case COMMENT:
      return {
        ...state,
        blogs: state.blogs.map((post) => {
          if (post._id == +action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    case CREATE:
      console.log(action.payload)
      return { ...state, blogs: [...state.blogs, action.payload] };
    case UPDATE:
      return { ...state, blogs: state.blogs.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case DELETE:
      return { ...state, blogs: state.blogs.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
};

