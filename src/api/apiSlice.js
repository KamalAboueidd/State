// RTK Query API Slice - مفصول في فولدر api/services مستقل
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // اسم الـ slice في الـ Redux Store
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }), // الرابط الأساسي
  tagTypes: ["post"],
  endpoints: (builder) => ({
    // GET Request لجلب المقالات مع Caching
    getPosts: builder.query({
      query: () => "posts?_limit=5",
      providesTags: ["post"],
    }),
    // Mutation لإضافة مقال وعمل Invalidate للكاش ليعيد الجلب تلقائياً
    addPost: builder.mutation({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

// Hooks جاهزة تم توليدها تلقائياً
export const { useGetPostsQuery, useAddPostMutation } = apiSlice;
