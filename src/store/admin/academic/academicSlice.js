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
  coursesByCycle: null,
  course: null,
  statusDataCourse: null, // 'CREATED' , 'UPDATED', 'DELETED'
  courseErrorMessage: undefined,
  courseSuccessMessage: undefined,

  totals: null,
};

export const academicSlice = createSlice({
  name: "academic",
  initialState,
  reducers: {
    // careers:
    setCareers: (state, action) => {
      state.careers = action.payload;
    },
    onCareerCrud: (state, { payload }) => {
      state.statusDataCareer = payload.crud;
      state.career = payload.career;
      state.careerSuccessMessage = payload.message;

      if (payload.crud === "CREATED") {
        state.careers.push(payload.career);
      }
      if (payload.crud === "UPDATED") {
        state.careers = state.careers.map((element) => {
          if (parseInt(element.id) === parseInt(payload.career.id)) {
            return payload.career;
          }
          return element;
        });
      }
      if (payload.crud === "DELETED") {
        state.careers = state.careers.filter(
          (data) => parseInt(data.id) !== parseInt(payload.career.id)
        );
      }
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
    onCycleCrud: (state, { payload }) => {
      state.statusDataCycle = payload.crud;
      state.cycle = payload.cycle;
      state.cycleSuccessMessage = payload.message;

      if (payload.crud === "CREATED") {
        state.cycles.push(payload.cycle);
      }
      if (payload.crud === "UPDATED") {
        state.cycles = state.cycles.map((element) => {
          if (parseInt(element.id) === parseInt(payload.cycle.id)) {
            return payload.cycle;
          }
          return element;
        });
      }
      if (payload.crud === "DELETED") {
        state.cycles = state.cycles.filter(
          (data) => parseInt(data.id) !== parseInt(payload.cycle.id)
        );
      }
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
    onCourseTypeCrud: (state, { payload }) => {
      state.statusDataCourseType = payload.crud;
      state.courseType = payload.courseType;
      state.courseTypeSuccessMessage = payload.message;

      if (payload.crud === "CREATED") {
        state.courseTypes.push(payload.courseType);
      }
      if (payload.crud === "UPDATED") {
        state.courseTypes = state.courseTypes.map((element) => {
          if (parseInt(element.id) === parseInt(payload.courseType.id)) {
            return payload.courseType;
          }
          return element;
        });
      }
      if (payload.crud === "DELETED") {
        state.courseTypes = state.courseTypes.filter(
          (data) => parseInt(data.id) !== parseInt(payload.courseType.id)
        );
      }
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
    setCoursesByCycle: (state, action) => {
      state.coursesByCycle = action.payload;
    },
    onCourseCrud: (state, { payload }) => {
      state.statusDataCourse = payload.crud;
      state.course = payload.course;
      state.courseSuccessMessage = payload.message;

      if (payload.crud === "CREATED") {
        state.courses.push(payload.course);
      }
      if (payload.crud === "UPDATED") {
        state.courses = state.courses.map((element) => {
          if (parseInt(element.id) === parseInt(payload.course.id)) {
            return payload.course;
          }
          return element;
        });
      }
      if (payload.crud === "DELETED") {
        state.courses = state.courses.filter(
          (data) => parseInt(data.id) !== parseInt(payload.course.id)
        );
      }
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

    // totals
    setTotals: (state, action) => {
      state.totals = action.payload;
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
  setCoursesByCycle,
  onCourseCrud,
  resetCourseCrud,
  setCourseErrorMessage,

  setTotals,
} = academicSlice.actions;
