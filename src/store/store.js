import { configureStore } from "@reduxjs/toolkit";
import  counterReducer  from "./counterSliceRTK";
 export const store = configureStore(
    { 
        reducer : {
            counter : counterReducer
        }
    }
 )