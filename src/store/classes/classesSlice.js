import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classes: null,
  class: null,
  statusDataClass: null, // 'CREATED' , 'UPDATED', 'DELETED'
  classErrorMessage: undefined,
  classSuccessMessage: undefined,
};

export const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    // classes:
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
    setClass: (state, action) => {
      state.class = action.payload;
    },
    onClassCrud: (state, action) => {
      state.statusDataClass = action.payload.crud;
      state.class = action.payload.class;
      state.classSuccessMessage = action.payload.message;
    },
    resetClassCrud: (state) => {
      state.class = null;
      state.statusDataClass = null;
      state.classErrorMessage = undefined;
      state.classSuccessMessage = undefined;
    },
    setClassErrorMessage: (state, action) => {
      state.classErrorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setClasses,
  setClass,
  onClassCrud,
  resetClassCrud,
  setClassErrorMessage,
} = classesSlice.actions;
