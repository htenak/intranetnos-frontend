import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classes: null,
  class: null,
  statusDataClass: null, // 'CREATED' , 'UPDATED', 'DELETED'
  classErrorMessage: undefined,
  classSuccessMessage: undefined,

  studentsClassByClassId: null, // para clases de estudiantes que se obtienen por classId
  studentsClasses: null, // para todas las clases de estudiantes
  studentClass: null,
  statusDataStudentClass: null,
  studentClassErrorMessage: undefined,
  studentClassSuccessMessage: undefined,

  days: null,
  schedules: null,
  schedule: null,
  statusDataSchedule: null, // 'CREATED' , 'UPDATED', 'DELETED'
  scheduleErrorMessage: undefined,
  scheduleSuccessMessage: undefined,
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

    // students classes:
    setStudentsClassByClassId: (state, action) => {
      state.studentsClassByClassId = action.payload;
    },
    setStudentsClasses: (state, action) => {
      state.studentsClasses = action.payload;
    },
    setStudentClass: (state, action) => {
      state.studentClass = action.payload;
    },
    onStudentClassCrud: (state, action) => {
      state.statusDataStudentClass = action.payload.crud;
      state.studentClass = action.payload.studentClass;
      state.studentClassSuccessMessage = action.payload.message;
    },
    resetStudentClassCrud: (state) => {
      state.studentClass = null;
      state.statusDataStudentClass = null;
      state.studentClassErrorMessage = undefined;
      state.studentClassSuccessMessage = undefined;
    },
    setStudentClassErrorMessage: (state, action) => {
      state.studentClassErrorMessage = action.payload;
    },

    // schedules:
    setDays: (state, action) => {
      state.days = action.payload;
    },
    setSchedules: (state, action) => {
      state.schedules = action.payload;
    },
    setSchedule: (state, action) => {
      state.schedule = action.payload;
    },
    onScheduleCrud: (state, action) => {
      state.statusDataSchedule = action.payload.crud;
      state.schedule = action.payload.schedule;
      state.scheduleSuccessMessage = action.payload.message;
    },
    resetScheduleCrud: (state) => {
      state.schedule = null;
      state.statusDataSchedule = null;
      state.scheduleErrorMessage = undefined;
      state.scheduleSuccessMessage = undefined;
    },
    setScheduleErrorMessage: (state, action) => {
      state.scheduleErrorMessage = action.payload;
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

  setStudentsClassByClassId,
  setStudentsClasses,
  setStudentClass,
  onStudentClassCrud,
  resetStudentClassCrud,
  setStudentClassErrorMessage,

  setDays,
  setSchedules,
  setSchedule,
  onScheduleCrud,
  resetScheduleCrud,
  setScheduleErrorMessage,
} = classesSlice.actions;
