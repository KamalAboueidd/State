import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { retry } from "@reduxjs/toolkit/query";

 
//  export const fetchPosts = createAsyncThunk(
//     'posts/fetchPosts',
//     async(_,thunkAPI)=> {
//         try {
//              const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
//              const data = response.json();
//              return data
//         }catch(e){
//             return thunkAPI.rejectWithValue(error.message)
//         }
//     }
//  )

 export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async(_,thunkAPI)=> {
        try {
             const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
             const data =await response.json();
             return data
        }catch(e){
            return thunkAPI.rejectWithValue(e.message)
        }
    } 
 )
  export const addPost = createAsyncThunk(
    'posts/addPost',
     async(newPostData , thunkAPI) => {
          try{
              const res = await fetch('https://jsonplaceholder.typicode.com/posts',{
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8',
                },
                body : JSON.stringify(newPostData),
              })
              const data = await res.json();
              return data;
          }catch(e){
             return  thunkAPI.rejectWithValue(e.message);
          }
     }
  );
 const initialState = {
     items : [],
     loading : false ,
     error : null,
 }
 const postsSlice = createSlice(
     {
        name : "posts",
        initialState,
        reducers : {},
        extraReducers : (builder) => {
            builder
            .addCase(fetchPosts.pending , (state)=> {
                state.loading = true,
                state.error = null
            })
            .addCase(fetchPosts.fulfilled ,(state , action) => {
                state.loading = false,
                state.items = action.payload;
            })
            .addCase(fetchPosts.rejected , (state , action) => {
                 state.loading = false;
                 state.error = action.payload;
            })
             // relate to add posts
            .addCase(addPost.pending , (state)=> {
                 state.loading = true;
                 state.error = null;
            })
            .addCase(addPost.fulfilled , (state)=> {
                 state.loading = false;
                 state.items.unshift(action.payload); 
            })
            .addCase(addPost.rejected , (state)=> {
                state.loading = false;
                 state.error = action.payload;
            })
        } 
     }
 )
 
 export default postsSlice.reducer;