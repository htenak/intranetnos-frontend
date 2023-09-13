import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "checking", // 'authenticated' , 'not-authenticated'
  myDataStatus: "no-changed", // 'editing' , 'updated'
  user: {},
  successMessage: undefined,
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
    onLogout: (state, action) => {
      state.status = "not-authenticated";
      state.myDataStatus = "no-changed";
      state.user = {};
      state.successMessage = undefined;
      state.errorMessage = action.payload;
    },
    onMyDataEditing: (state) => {
      state.myDataStatus = "editing";
      state.successMessage = undefined;
      state.errorMessage = undefined;
    },
    onMyDataCancelEditing: (state, action) => {
      state.errorMessage = action.payload;
      state.myDataStatus = "no-changed";
      state.successMessage = undefined;
    },
    onMyDataUpdated: (state, action) => {
      state.myDataStatus = "updated";
      state.user = action.payload.user;
      state.successMessage = action.payload.message;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = undefined;
    },
  },
});

export const {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage,
  clearSuccessMessage,
  onMyDataEditing,
  onMyDataCancelEditing,
  onMyDataUpdated,
} = authSlice.actions;
