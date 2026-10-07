import { configureStore } from "@reduxjs/toolkit";
import  counterReducer  from "./counterSliceRTK";
import  postsReducer  from "./PostSlice";
import courseReducer  from "./CourseSlice";
import  PostsEntityReducer  from "./postSliceWithEntiityAdapter";
import LoginReducer from './LoginSlice'
import { apiSlice } from "./apiSlice";
import uiReducer from './uiSlice'
 export const store = configureStore(
    { 
        reducer : {
            counter : counterReducer,
            posts : postsReducer,
            [apiSlice.reducerPath] : apiSlice.reducer,
            postsEntity : PostsEntityReducer,
             courses : courseReducer,
             login : LoginReducer,
             ui: uiReducer,
        },
      // middleware is a layer betw dispatch and store .
      // apply reux to work with async oper.. , RTK QUERY , caching , monitor the actions .
      // getDefualtMiddleware ==>DEFAULT middlware in redux . 
      // concat(apiSlice.middleware) ... relate to RTK query  (caching , track req ,time to update data,refetching)
      // getDefualtMiddleware().concat(apiSlice.middleware) ==> mean defualt middlware + RTK middlware .
        middleware : (getDefualtMiddleware) => {
              return getDefualtMiddleware().concat(apiSlice.middleware);// now i have a caching 
        }
    }
 )