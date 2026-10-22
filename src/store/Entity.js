import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const AllPosts = createEntityAdapter({
   sortComparer: (a, b) => a.name.localeCompare(b.name), // Sorting based name.
})

const initialState = AllPosts.getInitialState({
      loading : false ,
      error : null,
});

const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      return response.data;
    } catch (error) {
      throw error;
    }
});

export const AllPostsSlice = createSlice({
    name: 'AllPosts',
    initialState,
    reducers: {
          // Adapter Built in Methods => These methods will maintain the sorted order automatically. 
        addOne: AllPosts.addOne,
        addMany: AllPosts.addMany,
        updateOne: AllPosts.updateOne,
        removeOne: AllPosts.removeOne,
        removeAll: AllPosts.removeAll,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            AllPosts.setAll(state, action.payload); // all Posts that return from thunk. // mean set all posts to the state but with sorted order. (sortComparer)
        })
        .addCase(fetchUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUser.rejected, (state) => {
            state.loading = false;
            state.error = "Something Went Wrong";
        })
    }
})
export const { addOne, addMany, updateOne, removeOne, removeAll } = AllPostsSlice.actions;
export default AllPostsSlice.reducer;
   // Adapter Built in Selectors : 
export const {
    selectAll: selectAllPosts,   // return all posts in array (sorted)
    selectById: selectPostById,  // return post by id
    selectIds: selectPostIds,    // return all ids
} = AllPosts.getSelectors((state) => state.AllPosts);