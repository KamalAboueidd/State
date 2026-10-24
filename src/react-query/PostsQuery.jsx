import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// جلب المقالات من API تجريبية
const fetchPosts = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  return data;
};

// إرسال مقال جديد
const createPost = async (newPost) => {
  const { data } = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    newPost
  );
  return data;
};

export default function PostsQuery() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // 1. Query للبيانات
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // 2. Mutation للتعديل والإضافة
  const { mutate, isPending: isAdding } = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // تحديث الكاش تلقائياً
      queryClient.setQueryData(["posts"], (old = []) => [
        { ...newPost, id: Date.now() },
        ...old,
      ]);
      setTitle("");
      setBody("");
    },
  });

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    mutate({ title, body, userId: 1 });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "10px auto" }}>
      <h3>React Query (TanStack Query) - Test</h3>

      <form onSubmit={handleAddPost} style={{ marginBottom: "15px" }}>
        <div>
          <input
            type="text"
            placeholder="Post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <textarea
            placeholder="Post body..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="3"
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>
        <button type="submit" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add Post"}
        </button>
        <button type="button" onClick={() => refetch()}>
          {isFetching ? "Refetching..." : "Manual Refetch"}
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: "red" }}>Error: {error.message}</p>}

      <h4>Posts ({posts?.length || 0})</h4>
      <div>
        {posts?.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              marginBottom: "8px",
            }}
          >
            <h5 style={{ margin: "0 0 4px 0" }}>{post.title}</h5>
            <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
              {post.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
