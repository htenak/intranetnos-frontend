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
    onUserCreated: (state, { payload }) => {
      state.statusDataUser = "CREATED";
      state.user = payload.user;
      state.successMessage = payload.message;
      state.users.push(payload.user);
    },
    onUserUpdated: (state, { payload }) => {
      state.statusDataUser = "UPDATED";
      state.user = payload.user;
      state.successMessage = payload.message;
      state.users = state.users.map((element) => {
        if (parseInt(element.id) === parseInt(payload.user.id)) {
          return payload.user;
        }
        return element;
      });
    },
    onUserDeleted: (state, { payload }) => {
      state.statusDataUser = "DELETED";
      state.user = payload.user;
      state.successMessage = payload.message;
      state.users = state.users.filter(
        (data) => parseInt(data.id) !== parseInt(payload.user.id)
      );
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
