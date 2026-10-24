import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSliceRTK";
import postsReducer from "./slices/PostSlice";
import courseReducer from "./slices/CourseSlice";
import PostsEntityReducer from "./slices/postSliceWithEntiityAdapter";
import LoginReducer from "./slices/LoginSlice";
import uiReducer from "./slices/uiSlice";
import { apiSlice } from "../../api/apiSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    postsEntity: PostsEntityReducer,
    courses: courseReducer,
    login: LoginReducer,
    ui: uiReducer,
  },
  // middleware: يربط RTK Query caching ومتابعة الطلبات مع الـ Redux Store
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export default store;
