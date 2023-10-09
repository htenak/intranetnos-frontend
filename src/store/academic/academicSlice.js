import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  careers: null,
  career: null,
  statusDataCareer: null, // 'CREATED' , 'UPDATED', 'DELETED'
  careerErrorMessage: undefined,
  careerSuccessMessage: undefined,

  cycles: null,
  cycle: null,
  statusDataCycle: null, // 'CREATED' , 'UPDATED', 'DELETED'
  cycleErrorMessage: undefined,
  cycleSuccessMessage: undefined,

  courseTypes: null,
  courseType: null,
  statusDataCourseType: null, // 'CREATED' , 'UPDATED', 'DELETED'
  courseTypeErrorMessage: undefined,
  courseTypeSuccessMessage: undefined,

  courses: null,
  course: null,
  statusDataCourse: null, // 'CREATED' , 'UPDATED', 'DELETED'
  courseErrorMessage: undefined,
  courseSuccessMessage: undefined,
};

export const academicSlice = createSlice({
  name: "acedemic",
  initialState,
  reducers: {
    // careers:
    setCareers: (state, action) => {
      state.careers = action.payload;
    },
    onCareerCrud: (state, action) => {
      state.statusDataCareer = action.payload.crud;
      state.career = action.payload.career;
      state.careerSuccessMessage = action.payload.message;
    },
    resetCareerCrud: (state) => {
      state.career = null;
      state.statusDataCareer = null;
      state.careerErrorMessage = undefined;
      state.careerSuccessMessage = undefined;
    },
    setCareerErrorMessage: (state, action) => {
      state.careerErrorMessage = action.payload;
    },

    // cycles:
    setCycles: (state, action) => {
      state.cycles = action.payload;
    },
    onCycleCrud: (state, action) => {
      state.statusDataCycle = action.payload.crud;
      state.cycle = action.payload.cycle;
      state.cycleSuccessMessage = action.payload.message;
    },
    resetCycleCrud: (state) => {
      state.cycle = null;
      state.statusDataCycle = null;
      state.cycleErrorMessage = undefined;
      state.cycleSuccessMessage = undefined;
    },
    setCycleErrorMessage: (state, action) => {
      state.cycleErrorMessage = action.payload;
    },

    // courseTypes:
    setCourseTypes: (state, action) => {
      state.courseTypes = action.payload;
    },
    onCourseTypeCrud: (state, action) => {
      state.statusDataCourseType = action.payload.crud;
      state.courseType = action.payload.courseType;
      state.courseTypeSuccessMessage = action.payload.message;
    },
    resetCourseTypeCrud: (state) => {
      state.courseType = null;
      state.statusDataCourseType = null;
      state.courseTypeErrorMessage = undefined;
      state.courseTypeSuccessMessage = undefined;
    },
    setCourseTypeErrorMessage: (state, action) => {
      state.courseTypeErrorMessage = action.payload;
    },

    // courses:
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    onCourseCrud: (state, action) => {
      state.statusDataCourse = action.payload.crud;
      state.course = action.payload.course;
      state.courseSuccessMessage = action.payload.message;
    },
    resetCourseCrud: (state) => {
      state.course = null;
      state.statusDataCourse = null;
      state.courseErrorMessage = undefined;
      state.courseSuccessMessage = undefined;
    },
    setCourseErrorMessage: (state, action) => {
      state.courseErrorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCareers,
  onCareerCrud,
  resetCareerCrud,
  setCareerErrorMessage,

  setCycles,
  onCycleCrud,
  resetCycleCrud,
  setCycleErrorMessage,

  setCourseTypes,
  onCourseTypeCrud,
  resetCourseTypeCrud,
  setCourseTypeErrorMessage,

  setCourses,
  onCourseCrud,
  resetCourseCrud,
  setCourseErrorMessage,
} = academicSlice.actions;
