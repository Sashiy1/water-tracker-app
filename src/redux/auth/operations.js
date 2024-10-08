import { createAsyncThunk } from "@reduxjs/toolkit";
import {
 
  requestAuthGoogle,
  requestChangePassword,
  requestLogIn,
  requestLogOut,
  requestResetMail,
  requestSignUp,
  requestTokenRefresh,
} from "../services/auth";

export const apiRegisterUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const data = await requestSignUp(formData);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const apiLoginUser = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const data = await requestLogIn(formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const apiLogOutUser = createAsyncThunk(
  "auth/logout",
  async (formData, thunkAPI) => {
    try {
      const data = await requestLogOut(formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const apiSendResetMail = createAsyncThunk(
  "auth/resetMail",
  async (formData, thunkAPI) => {
    try {
      const data = await requestResetMail(formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const apiResetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (formData, thunkAPI) => {
    try {
      console.log(formData);
      const data = await requestChangePassword(formData);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const apiTokenRefresh = createAsyncThunk(
  "auth/tokenRefresh",
  async (formData, thunkAPI) => {
    try {
      const data = await requestTokenRefresh();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);


export const apiAuthGoogle = createAsyncThunk(
  "auth/authGoogle",
  async (formData, thunkAPI) => {
    try {
      const data = await requestAuthGoogle(formData);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);
