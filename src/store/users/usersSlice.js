import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: null,
  users: null,
  user: null,
  statusDataUser: null, // 'CREATED' , 'UPDATED', 'DELETED'
  errorMessage: undefined,
  successMessage: undefined,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    onUserCreated: (state, action) => {
      state.statusDataUser = "CREATED";
      state.user = action.payload.user;
      state.successMessage = action.payload.message;
    },
    onUserUpdated: (state, action) => {
      state.statusDataUser = "UPDATED";
      state.user = action.payload.user;
      state.successMessage = action.payload.message;
    },
    onUserDeleted: (state, action) => {
      state.statusDataUser = "DELETED";
      state.user = action.payload.user;
      state.successMessage = action.payload.message;
    },
    resetDataUser: (state) => {
      state.user = null;
      state.statusDataUser = null;
      state.errorMessage = undefined;
      state.successMessage = undefined;
    },
    setErrorUsersMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setRoles,
  setUsers,
  onUserCreated,
  onUserUpdated,
  onUserDeleted,
  resetDataUser,
  setErrorUsersMessage,
} = usersSlice.actions;
