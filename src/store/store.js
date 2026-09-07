import { configureStore } from "@reduxjs/toolkit";
import  counterReducer  from "./counterSliceRTK";
import  postsReducer  from "./PostSlice";
 export const store = configureStore(
    { 
        reducer : {
            counter : counterReducer,
            posts : postsReducer
        }
    }
 )