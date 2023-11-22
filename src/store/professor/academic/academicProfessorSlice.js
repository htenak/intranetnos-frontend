import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  careersProfessor: null,
  careerProfessorErrorMessage: undefined,
  careerProfessorSuccessMessage: undefined,

  cyclesProfessor: null,
  cycleProfessorErrorMessage: undefined,
  cycleProfessorSuccessMessage: undefined,

  colleaguesProfessor: null,
  colleagueProfessorErrorMessage: undefined,
  colleagueProfessorSuccessMessage: undefined,
};

export const academicProfessorSlice = createSlice({
  name: "academicProfessor",
  initialState,
  reducers: {
    setCareersProfessor: (state, { payload }) => {
      state.careersProfessor = payload;
    },
    resetCareerProfessor: (state) => {
      state.careerProfessorErrorMessage = undefined;
      state.careerProfessorSuccessMessage = undefined;
    },
    setCareerProfessorErrorMessage: (state, { payload }) => {
      state.careerProfessorErrorMessage = payload;
    },

    setCyclesProfessor: (state, { payload }) => {
      state.cyclesProfessor = payload;
    },
    resetCycleProfessor: (state) => {
      state.cycleProfessorErrorMessage = undefined;
      state.cycleProfessorSuccessMessage = undefined;
    },
    setCycleProfessorErrorMessage: (state, { payload }) => {
      state.cycleProfessorErrorMessage = payload;
    },

    setColleaguesProfessor: (state, { payload }) => {
      state.colleaguesProfessor = payload;
    },
    resetColleagueProfessor: (state) => {
      state.colleagueProfessorErrorMessage = undefined;
      state.colleagueProfessorSuccessMessage = undefined;
    },
    setColleagueProfessorErrorMessage: (state, { payload }) => {
      state.colleagueProfessorSuccessMessage = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCareersProfessor,
  resetCareerProfessor,
  setCareerProfessorErrorMessage,

  setCyclesProfessor,
  resetCycleProfessor,
  setCycleProfessorErrorMessage,

  setColleaguesProfessor,
  resetColleagueProfessor,
  setColleagueProfessorErrorMessage,
} = academicProfessorSlice.actions;
