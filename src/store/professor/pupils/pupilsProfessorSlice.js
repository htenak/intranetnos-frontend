import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pupilsProfessor: null,
  loadingPupilsProfessor: false,

  pupilProfessorSuccessMessage: undefined,
  pupilProfessorErrorMessage: undefined,
};

export const pupilsProfessorSlice = createSlice({
  name: "pupilsProfessor",
  initialState,
  reducers: {
    setPupilsProfessor: (state, { payload }) => {
      state.pupilsProfessor = payload;
    },
    setLoadingPupilsProfessor: (state, { payload }) => {
      state.loadingPupilsProfessor = payload;
    },
    resetPupilProfessor: (state) => {
      state.pupilProfessorSuccessMessage = undefined;
      state.pupilProfessorErrorMessage = undefined;
    },
    setPupilProfessorErrorMessage: (state, { payload }) => {
      state.pupilProfessorErrorMessage = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPupilsProfessor,
  resetPupilProfessor,
  setLoadingPupilsProfessor,
  setPupilProfessorErrorMessage,
} = pupilsProfessorSlice.actions;
