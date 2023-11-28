import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classesProfessor: null,
  statusPhotoClass: null, // ' UPDATED ', ' DELETED '
  classProfessor: null,

  otherClassesProfessors: null,
  loadingOtherClassesP: false,
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
    onCrudPhotoClassProfessor: (state, { payload }) => {
      state.statusPhotoClass = payload.crud;
      state.classProfessorSuccessMessage = payload.message;
      state.classProfessor = payload.classProfessor;

      if (payload.crud === "UPDATED" || payload.crud === "DELETED") {
        state.classesProfessor = state.classesProfessor.map((element) => {
          if (parseInt(element.id) === parseInt(payload.classProfessor.id)) {
            return payload.classProfessor;
          }
          return element;
        });
      }
    },
    resetClassProfessor: (state) => {
      state.classProfessor = null;
      state.statusPhotoClass = null;
      state.classProfessorErrorMessage = undefined;
      state.classProfessorSuccessMessage = undefined;
    },
    setClassProfessorErrorMessage: (state, { payload }) => {
      state.classProfessorErrorMessage = payload;
    },
    setOtherClassesProfessors: (state, { payload }) => {
      state.otherClassesProfessors = payload.sort((a, b) => b.id - a.id);
    },
    setLoadingOtherClassesP: (state, { payload }) => {
      state.loadingOtherClassesP = payload;
    },
    setSchedulesByClass: (state, { payload }) => {
      state.schedulesByClass = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setClassesProfessor,
  onCrudPhotoClassProfessor,
  resetClassProfessor,
  setClassProfessorErrorMessage,
  setLoadingOtherClassesP,
  setOtherClassesProfessors,
  setSchedulesByClass,
} = classesProfessorSlice.actions;
