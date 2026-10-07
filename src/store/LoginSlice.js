import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1. Read previously saved token from LocalStorage (to persist session on refresh)
const tokenFromStorage = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token'))
  : null;

// 2. Async thunk for user login API request
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Send login request with email and password
      const response = await axios.post('https://api.example.com/login', userData);

      // Save token in LocalStorage
      localStorage.setItem('token', JSON.stringify(response.data.token));

      return response.data; // Returns user data and token
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const initialState = {
  user: null,
  token: tokenFromStorage, // Initialize with stored token if available
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout action
    logout: (state) => {
      state.user = null;
      state.token = null;
      // Remove token from LocalStorage
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token; // Store token in state
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;