import { configureStore } from "@reduxjs/toolkit";
import  counterReducer  from "./counterSliceRTK";
import  postsReducer  from "./PostSlice";
import courseReducer  from "./CourseSlice";
import  PostsEntityReducer  from "./postSliceWithEntiityAdapter";
import { apiSlice } from "./apiSlice";
 export const store = configureStore(
    { 
        reducer : {
            counter : counterReducer,
            posts : postsReducer,
            [apiSlice.reducerPath] : apiSlice.reducer,
            postsEntity : PostsEntityReducer,
             courses : courseReducer
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