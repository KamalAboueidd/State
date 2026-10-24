import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

// 1. إنشاء الـ Adapter
const postAdapter = createEntityAdapter({
  selectId: (post) => post.id,
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = postAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchPostsEntity = createAsyncThunk(
  "postsEntity/fetchPosts",
  async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return res.data;
  }
);

export const postSliceWithEntiityAdapter = createSlice({
  name: "postsEntity",
  initialState,
  reducers: {
    postAdded: postAdapter.addOne,
    postUpdated: postAdapter.updateOne,
    postDeleted: postAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsEntity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostsEntity.fulfilled, (state, action) => {
        state.status = "succeeded";
        postAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPostsEntity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch";
      });
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postAdapter.getSelectors((state) => state.postsEntity || state.posts);

export const { postAdded, postUpdated, postDeleted } =
  postSliceWithEntiityAdapter.actions;

export default postSliceWithEntiityAdapter.reducer;
