import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: null,
  student: null,
  statusDataStudent: null, // 'CREATED' , 'UPDATED', 'DELETED'
  errorMessage: undefined,
  successMessage: undefined,
};

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    onStudentCreated: (state, action) => {
      state.statusDataStudent = "CREATED";
      state.student = action.payload.student;
      state.successMessage = action.payload.message;
    },
    onStudentUpdated: (state, action) => {
      state.statusDataStudent = "UPDATED";
      state.student = action.payload.student;
      state.successMessage = action.payload.message;
    },
    onStudentDeleted: (state, action) => {
      state.statusDataStudent = "DELETED";
      state.student = action.payload.student;
      state.successMessage = action.payload.message;
    },
    resetDataStudent: (state) => {
      state.student = null;
      state.statusDataStudent = null;
      state.errorMessage = undefined;
      state.successMessage = undefined;
    },
    setErrorStudentsMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setStudents,
  setErrorStudentsMessage,
  onStudentCreated,
  onStudentUpdated,
  onStudentDeleted,
  resetDataStudent,
} = studentsSlice.actions;
