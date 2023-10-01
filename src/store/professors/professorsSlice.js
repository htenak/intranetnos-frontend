import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  professors: null,
  professor: null,
  statusDataProfessor: null, // 'CREATED' , 'UPDATED', 'DELETED'
  errorMessage: undefined,
  successMessage: undefined,
};

export const professorsSlice = createSlice({
  name: "professors",
  initialState,
  reducers: {
    setProfessors: (state, action) => {
      state.professors = action.payload;
    },
    onProfessorCreated: (state, action) => {
      state.statusDataProfessor = "CREATED";
      state.professor = action.payload.professor;
      state.successMessage = action.payload.message;
    },
    onProfessorUpdated: (state, action) => {
      state.statusDataProfessor = "UPDATED";
      state.professor = action.payload.professor;
      state.successMessage = action.payload.message;
    },
    onProfessorDeleted: (state, action) => {
      state.statusDataProfessor = "DELETED";
      state.professor = action.payload.professor;
      state.successMessage = action.payload.message;
    },
    resetDataProfessor: (state) => {
      state.professor = null;
      state.statusDataProfessor = null;
      state.errorMessage = undefined;
      state.successMessage = undefined;
    },
    setErrorProfessorsMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProfessors,
  setErrorProfessorsMessage,
  onProfessorCreated,
  onProfessorUpdated,
  onProfessorDeleted,
  resetDataProfessor,
} = professorsSlice.actions;
