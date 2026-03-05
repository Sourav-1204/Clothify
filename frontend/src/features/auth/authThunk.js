import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { storeInLocalStorage } from "../../utils/localStorageHelper";
import { toast } from "sonner";

// Async thunk for user login
const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData,
      );

      storeInLocalStorage("userInfo", response.data.user);
      storeInLocalStorage("userToken", response.data.token);

      if (response.data.status === 200) {
        toast.success("Logged in successfully.");
      }

      return response.data.user; // Return the user object from the response
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);

// Async thunk for User Registration
const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData,
      );
      storeInLocalStorage("userInfo", response.data.user);
      storeInLocalStorage("userToken", response.data.token);

      return response.data.user; // Return the user object from the response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export { loginUser, registerUser };
