import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unfoldableShow: false,
  sidebarShow: true,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setNav: (state, action) => {
      state.sidebarShow = action.payload;
    },
    setUnfoldable: (state, action) => {
      state.unfoldableShow = action.payload;
    },
  },
});

export const { setNav, setUnfoldable } = navSlice.actions;
