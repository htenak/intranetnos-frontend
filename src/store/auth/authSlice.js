import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "checking", // 'authenticated' , 'not-authenticated'
  user: {},
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, action) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    onLogout: (state) => {
      state.user = null;
    },
  },
});

export const { onChecking, onLogin, onLogout } = authSlice.actions;
