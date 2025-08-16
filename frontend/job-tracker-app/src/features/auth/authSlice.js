import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL
const API_URL = import.meta.env.VITE_API_BASE_URL;

//get token
const token = localStorage.getItem("token");

const initialState = {
  user: null,
  token: token || null,
  isAuthenticated: !!token,
  loading: false,
  loginError: null,
  regError: null,
};

// register user

export const registerUser = createAsyncThunk(
  "/register",
  async (FormData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/register`, FormData);
      //   console.log(res.data);
      return res.data; //token and user
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

//login user

export const loginUser = createAsyncThunk(
  "/login",
  async (FormData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/login`, FormData);
      //   console.log(res.data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// get user data

export const getUser = createAsyncThunk("/users", async (token, thunkAPI) => {
  try {
    const res = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data.users[0];
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});
export const logOut = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.regError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        // state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.regError = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.username;
        state.isAuthenticated = true;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
