import { configureStore } from "@reduxjs/toolkit";
import {
  navSlice,
  authSlice,
  usersSlice,
  studentsSlice,
  professorsSlice,
  academicSlice,
  classesSlice,
  classesProfessorSlice,
  academicProfessorSlice,
  pupilsProfessorSlice,
  activitiesProfessorSlice,
} from "./";

export const store = configureStore({
  reducer: {
    nav: navSlice.reducer,
    auth: authSlice.reducer,

    users: usersSlice.reducer,
    students: studentsSlice.reducer,
    professors: professorsSlice.reducer,
    academic: academicSlice.reducer,
    classes: classesSlice.reducer,

    classesProfessor: classesProfessorSlice.reducer,
    academicProfessor: academicProfessorSlice.reducer,
    pupilsProfessor: pupilsProfessorSlice.reducer,
    activitiesProfessor: activitiesProfessorSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production", // habilita DevTools en desarrollo
});
