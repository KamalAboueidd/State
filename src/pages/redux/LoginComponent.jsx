import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "../../store/redux/slices/LoginSlice";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { token, isLoading, error, user } = useSelector(
    (state) => state.login || state.auth || {}
  );

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (token) {
    return (
      <div className="card">
        <h2>Welcome back! Logged in successfully 🎉</h2>
        {user && <p>Signed in as: {user.name || user.email || "User"}</p>}
        <button className="danger-btn" onClick={() => dispatch(logout())}>
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Redux Auth / Sign In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin} className="form-col">
        <div>
          <input
            type="email"
            placeholder="Email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoading} className="primary-btn">
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default LoginComponent;
