import { useState } from "react";
import {
  useGetPostsQuery,
  useAddPostMutation,
} from "../../api/apiSlice";

function RtkQueryPosts() {
  const { data: posts, isLoading, isError, error, isFetching } = useGetPostsQuery();
  const [addPost, { isLoading: isAdding }] = useAddPostMutation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    try {
      await addPost({ title, body, userId: 1 }).unwrap();
      setTitle("");
      setBody("");
    } catch (err) {
      console.error("Failed to add post:", err);
    }
  };

  return (
    <div className="card">
      <h2>⚡ RTK Query (Isolated API Slice)</h2>
      <p style={{ color: "#94a3b8" }}>
        مفصول في <code>src/api/apiSlice.js</code> ومزود بـ Automatic Caching & Invalidation
      </p>

      <form onSubmit={handleAddPost} className="form-col">
        <input
          type="text"
          placeholder="New Post Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="New Post Body..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="3"
          required
        />
        <button type="submit" disabled={isAdding} className="primary-btn">
          {isAdding ? "Adding..." : "+ Add Post with RTK Query"}
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {isLoading && <p style={{ color: "#38bdf8" }}>Loading from RTK Query cache/server...</p>}
      {isFetching && !isLoading && <p style={{ color: "#a855f7" }}>Refetching / Updating cache...</p>}
      {isError && <p style={{ color: "#f87171" }}>Error: {JSON.stringify(error)}</p>}

      <h3>Cached Posts ({posts?.length || 0})</h3>
      <div className="list-container">
        {posts?.map((post) => (
          <div key={post.id} className="list-item">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RtkQueryPosts;
