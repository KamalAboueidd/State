import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout } from '../store/LoginSlice';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  // Extract auth credentials, status, and user data from state
  const { token, isLoading, error, user } = useSelector(
    (state) => state.login || state.auth || {}
  );

  const handleLogin = (e) => {
    e.preventDefault();
    // Dispatch login thunk with user credentials
    dispatch(loginUser({ email, password }));
  };

  // If user is already authenticated
  if (token) {
    return (
      <div>
        <h2>Welcome back! You are logged in successfully! </h2>
        {user && <p>Signed in as: {user.name || user.email || 'User'}</p>}
        <button onClick={() => dispatch(logout())}>Log Out</button>
      </div>
    );
  }

  // If user is not authenticated yet
  return (
    <form onSubmit={handleLogin}>
      <h2>Sign In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <input
          type="email"
          placeholder="Email address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}

export default LoginComponent;