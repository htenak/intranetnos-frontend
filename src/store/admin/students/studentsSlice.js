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
    onStudentCreated: (state, { payload }) => {
      state.statusDataStudent = "CREATED";
      state.student = payload.student;
      state.successMessage = payload.message;
      state.students.push(payload.student);
    },
    onStudentUpdated: (state, { payload }) => {
      state.statusDataStudent = "UPDATED";
      state.student = payload.student;
      state.successMessage = payload.message;
      state.students = state.students.map((element) => {
        if (parseInt(element.id) === parseInt(payload.student.id)) {
          return payload.student;
        }
        return element;
      });
    },
    onStudentDeleted: (state, { payload }) => {
      state.statusDataStudent = "DELETED";
      state.student = payload.student;
      state.successMessage = payload.message;
      state.students = state.students.filter(
        (data) => parseInt(data.id) !== parseInt(payload.student.id)
      );
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
