import { createSlice } from "@reduxjs/toolkit";
import {
  apiAuthGoogle,
  apiLoginUser,
  apiLogOutUser,
  apiRegisterUser,
  apiTokenRefresh,
} from "./operations";

const INITIAL_STATE = {
  user: {
    email: null,
  },
  token: null,
  isSignedIn: false,
  isLoading: false,
  isError: null,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  (state.isLoading = false), (state.error = action.payload);
};

const authSlice = createSlice({
  // Ім'я слайсу
  name: "auth",
  // Початковий стан редюсера слайсу
  initialState: INITIAL_STATE,

  reducers: {
    logOutUserLocally: (state) => {
      state.user = null;
      state.token = null;
      state.isSignedIn = false;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder

      // REGISTER USER //

      .addCase(apiRegisterUser.pending, handlePending)
      .addCase(apiRegisterUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        (state.isError = false), (state.isLoading = false);
      })
      .addCase(apiRegisterUser.rejected, handleRejected)

      // LOGIN USER //

      .addCase(apiLoginUser.pending, handlePending)
      .addCase(apiLoginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isSignedIn = true;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(apiLoginUser.rejected, handleRejected)

      // LOG OUT USER //

      .addCase(apiLogOutUser.pending, handlePending)
      .addCase(apiLogOutUser.fulfilled, (state) => {
        localStorage.removeItem("token");
        state.user = INITIAL_STATE.user;
        state.token = null;
        state.isSignedIn = false;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(apiLogOutUser.rejected, handleRejected)

      // ACCESS TOKEN REFRESH //

      .addCase(apiTokenRefresh.pending, handlePending)
      .addCase(apiTokenRefresh.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.token = action.payload.token;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(apiTokenRefresh.rejected, handleRejected)

  // GOOGLE LOGIN //

  .addCase(apiAuthGoogle.pending, handlePending)
  .addCase(apiAuthGoogle.fulfilled, (state, action) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.isSignedIn = true;
    state.isLoading = false;
    state.isError = false;
    state.error = null;
  })
  .addCase(apiAuthGoogle.rejected, handleRejected),

      
});
export const { logOutUserLocally } = authSlice.actions;
// Редюсер слайсу
export const authReducer = authSlice.reducer;
