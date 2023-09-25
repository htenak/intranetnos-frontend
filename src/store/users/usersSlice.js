import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
  isLoadingRoles: "no-changed", // 'loading' , 'loaded'
  user: {},
  users: [],
  isLoadingUsers: "no-changed", // 'loading' , 'loaded'
  statusDataUser: "no-changed", // 'editing' , 'creating' , 'created' , 'updated', 'deleted'
  errorMessage: undefined,
  successMessage: undefined,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    startLoadingRoles: (state) => {
      state.isLoadingRoles = "loading";
      state.roles = [];
    },
    setRoles: (state, action) => {
      state.isLoadingRoles = "loaded";
      state.roles = action.payload;
    },
    startLoadingUsers: (state) => {
      state.errorMessage = undefined;
      state.isLoadingUsers = "loading";
    },
    setUsers: (state, action) => {
      state.users = action.payload;
      state.isLoadingUsers = "loaded";
    },
    onUsersChanging: (state, action) => {
      state.user = {};
      state.statusDataUser = action.payload;
      state.successMessage = undefined;
      state.errorMessage = undefined;
    },
    onUserCreated: (state, action) => {
      state.statusDataUser = "created";
      state.user = action.payload.user;
      state.successMessage = action.payload.message;
    },
    onUserUpdated: (state, action) => {
      state.statusDataUser = "updated";
      state.user = action.payload.user;
      state.successMessage = action.payload.message;
    },
    onUserDeleted: (state, action) => {
      state.statusDataUser = "deleted";
      state.user = action.payload.user;
      state.successMessage = action.payload.message;
    },
    resetDataUser: (state) => {
      state.user = {};
      state.statusDataUser = "no-changed";
    },
    setErrorUsersMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setSuccessUsersMessage: (state, action) => {
      state.successMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startLoadingRoles,
  setRoles,
  startLoadingUsers,
  setUsers,
  setErrorUsersMessage,
  setSuccessUsersMessage,
  onUsersChanging,
  onUserCreated,
  onUserUpdated,
  onUserDeleted,
  resetDataUser,
} = usersSlice.actions;
