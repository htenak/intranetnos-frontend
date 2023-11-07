import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classesProfessor: null,
  otherClassesProfessors: null,
  schedulesByClass: null,
  classProfessorErrorMessage: undefined,
  classProfessorSuccessMessage: undefined,
};

export const classesProfessorSlice = createSlice({
  name: "classesProfessor",
  initialState,
  reducers: {
    setClassesProfessor: (state, { payload }) => {
      state.classesProfessor = payload;
    },
    resetClassProfessor: (state) => {
      state.classProfessorErrorMessage = undefined;
      state.classProfessorSuccessMessage = undefined;
    },
    setClassProfessorErrorMessage: (state, { payload }) => {
      state.classProfessorErrorMessage = payload;
    },

    setOtherClassesProfessors: (state, { payload }) => {
      state.otherClassesProfessors = payload.sort((a, b) => b.id - a.id);
    },
    setSchedulesByClass: (state, { payload }) => {
      state.schedulesByClass = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setClassesProfessor,
  resetClassProfessor,
  setClassProfessorErrorMessage,
  setOtherClassesProfessors,
  setSchedulesByClass,
} = classesProfessorSlice.actions;
