import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";

interface UserState {
  user: {
    id: string;
    email: string;
    username: string;
    availableMoney: number;
  } | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const cookies = new Cookies();

const initialState: UserState = {
  user: cookies.get("user") || null,
  token: cookies.get("access_token") || null,
  isLoading: false,
  error: null,
};

export const signInUser = createAsyncThunk(
  "/user/loginUser",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/users/login",
        { username, password }
      );
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data.type) {
        return rejectWithValue(err.response.data.type);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const signUpUser = createAsyncThunk(
  "/user/registerUser",
  async (
    {
      email,
      username,
      password,
    }: {
      email: string;
      username: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/users/register",
        { email, username, password }
      );
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data.type) {
        return rejectWithValue(err.response.data.type);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.token = null;
      cookies.remove("access_token");
      cookies.remove("user");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        cookies.set("access_token", action.payload.token, { path: "/" });
        cookies.set("user", JSON.stringify(action.payload.user), { path: "/" });
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
