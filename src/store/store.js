import { configureStore } from "@reduxjs/toolkit";
import {
  navSlice,
  authSlice,
  usersSlice,
  studentsSlice,
  professorsSlice,
} from "./";

export const store = configureStore({
  reducer: {
    nav: navSlice.reducer,
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    students: studentsSlice.reducer,
    professors: professorsSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production", // habilita DevTools en desarrollo
});
