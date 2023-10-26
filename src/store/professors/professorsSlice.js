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
    onProfessorCreated: (state, { payload }) => {
      state.statusDataProfessor = "CREATED";
      state.professor = payload.professor;
      state.successMessage = payload.message;
      state.professors.push(payload.professor);
    },
    onProfessorUpdated: (state, { payload }) => {
      state.statusDataProfessor = "UPDATED";
      state.professor = payload.professor;
      state.successMessage = payload.message;
      state.professors = state.professors.map((element) => {
        if (parseInt(element.id) === parseInt(payload.professor.id)) {
          return payload.professor;
        }
        return element;
      });
    },
    onProfessorDeleted: (state, { payload }) => {
      state.statusDataProfessor = "DELETED";
      state.professor = payload.professor;
      state.successMessage = payload.message;
      state.professors = state.professors.filter(
        (data) => parseInt(data.id) !== parseInt(payload.professor.id)
      );
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
