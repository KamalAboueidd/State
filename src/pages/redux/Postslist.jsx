import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, fetchPosts } from "../../store/redux/slices/PostSlice";

function PostsList() {
  const dispatch = useDispatch();
  const { items, loading: isLoading, error } = useSelector((state) => state.posts);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    dispatch(addPost({ title, body, userId: 1 }));
    setTitle("");
    setBody("");
  }

  return (
    <div className="card">
      <h2>Redux Async Posts (createAsyncThunk)</h2>

      <form onSubmit={handleSubmit} className="form-col">
        <input
          type="text"
          placeholder="Post Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Post Content / Body..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="3"
          required
        />
        <button type="submit" className="primary-btn">
          Add New Post
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {isLoading && <p style={{ color: "#38bdf8" }}>Loading posts...</p>}
      {error && <p style={{ color: "#f87171" }}>Error: {error}</p>}

      <h3>Posts List ({items?.length || 0})</h3>
      <div className="list-container">
        {items &&
          items.map((post) => (
            <div key={post.id} className="list-item">
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PostsList;
