import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

 

   //  - 1 create Adapter . 
const postAdapter = createEntityAdapter({
    selectId : (post) => post.id,
    sortComparer : (a  ,b) => b.id.localCompare(a.id) // 
})
const initialState = postAdapter.getInitialState({
    status : 'idel',
    error : null
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=> {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return res.data;
})

export const postSliceWithEntiityAdapter = createSlice({
    name : 'posts',
    initialState ,
    reducers : {
         // prepared reducers (magic !)
         postAdded : postAdapter.addOne,
         postUpdated : postAdapter.updateOne,
         postDeleted : postAdapter.removeOne,
    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchPosts.pending , (state) => {
                state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled , (state , action) => {
            state.status = 'succedded';
    // action comes as array .. setAll store the array that come in entites , as normazlize state (magic !)
         postAdapter.setAll(state , action.payload);
        })
        .addCase(fetchPosts.error , (state) => {
             state.status = 'failed',
             state.error = action.payload.message
        })
    }

})
  // adapter give you buit in funcs to read and dispaly data 
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
} = postAdapter.getSelectors((state) => state.posts);

export const { postAdded, postsUpdated, postDeleted } = postsSlice.actions;
export default postSliceWithEntiityAdapter.reducer;