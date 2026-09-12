 // work  with async without asyncThunk .. createApi 
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // react to provid reactHook directly 
 
 export const apiSlice = createApi({
    reducerPath : 'api',  // name that will be save in reduc store 
     // url test
    baseQuery :fetchBaseQuery({ baseUrl : ('https://jsonplaceholder.typicode.com/')}), // main endpoint
     tagTypes : ['post'],
    endpoints : (builder) => ({  // take par.. builder who let me talk and say what i want(fetch da , post ?..)
         // builder.query ==?> when i want to make Get request. 
        getPosts : builder.query({
            query : ()=> 'posts?_limit=5',
            providesTags : ['post'] , //  when the data is loaded => give tag to the data  , now Cach has tag = post . 
         }),
         // builder.mutation ==> update or send data (POST, PUT, DELETE)
         addPostt : builder.mutation({
            query : (newPost) => ({
                url : 'posts',   
                method : 'POST',
                body: newPost,
            }),
            invalidatesTags : ['post']  // when the data is added => delete Cach that has tag = post . => refetch
         }),
    }),
 })
 export const {useGetPostsQuery , useAddPostMutation  } = apiSlice ; // custom hooks created munally by RTK

//  fetchBaseQuery ==> دي أداة مساعدة بسيطة مبنية أساساً فوق الـ fetch العادية بتاعت المتصفح، فايدتها توفر عليك كتابة الهيدرز والـ JSON conversion في كل مرة، وتظبطلك الرابط الثابت

// unwrap 
//refetchOnMountOrArgChange 
//skip ==> prevent quary from running
