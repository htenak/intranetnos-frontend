import { configureStore } from "@reduxjs/toolkit";
import { navSlice, authSlice } from "./";

export const store = configureStore({
  reducer: {
    nav: navSlice.reducer,
    auth: authSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Habilita DevTools en desarrollo
});
