import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: {},
  students: [],
  isLoadingStudents: "no-changed", // 'loading' , 'loaded'
  statusDataStudent: "no-changed", // 'editing' , 'creating' , 'created' , 'updated', 'deleted'
  errorMessage: undefined,
  successMessage: undefined,
};

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    startLoadingStudents: (state) => {
      state.errorMessage = undefined;
      state.isLoadingStudents = "loading";
    },
    setStudents: (state, action) => {
      state.students = action.payload;
      state.isLoadingStudents = "loaded";
    },
    onStudentsChanging: (state, action) => {
      state.student = {};
      state.statusDataStudent = action.payload;
      state.successMessage = undefined;
      state.errorMessage = undefined;
    },
    onStudentCreated: (state, action) => {
      state.statusDataStudent = "created";
      state.student = action.payload.student;
      state.successMessage = action.payload.message;
    },
    onStudentUpdated: (state, action) => {
      state.statusDataStudent = "updated";
      state.student = action.payload.student;
      state.successMessage = action.payload.message;
    },
    onStudentDeleted: (state, action) => {
      state.statusDataStudent = "deleted";
      state.student = action.payload.student;
      state.successMessage = action.payload.message;
    },
    resetDataStudent: (state) => {
      state.student = {};
      state.statusDataStudent = "no-changed";
    },
    setErrorStudentsMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setSuccessStudentsMessage: (state, action) => {
      state.successMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startLoadingStudents,
  setStudents,
  setErrorStudentsMessage,
  setSuccessStudentsMessage,
  onStudentsChanging,
  onStudentCreated,
  onStudentUpdated,
  onStudentDeleted,
  resetDataStudent,
} = studentsSlice.actions;
