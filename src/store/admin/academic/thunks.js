import { intranetApi } from "src/api";
import {
  setCareers,
  onCareerCrud,
  resetCareerCrud,
  setCareerErrorMessage,
  setClassrooms,
  onClassroomCrud,
  resetClassroomCrud,
  setClassroomErrorMessage,
  setClassroomsCareers,
  onClassroomCareerCrud,
  resetClassroomCareerCrud,
  setClassroomCareerErrorMessage,
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
  setTotals,
  setCoursesByCycle,
  setClassroomsCareerByCareerId,
} from "../academic";

// careers:

export const getAllCareers = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/academic/careers`);
      dispatch(setCareers(data.data));
    } catch (error) {
      dispatch(setCareerErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCareerCrud());
      }, 50);
    }
  };
};

export const saveCareer = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.post(`/academic/careers`, form);
      dispatch(
        onCareerCrud({
          crud: "CREATED",
          career: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetCareerCrud());
      }, 50);
    } catch (error) {
      dispatch(setCareerErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCareerCrud());
      }, 50);
    }
  };
};

export const updateCareer = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.put(
        `/academic/careers/${form.id}`,
        form
      );
      dispatch(
        onCareerCrud({
          crud: "UPDATED",
          career: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetCareerCrud());
      }, 50);
    } catch (error) {
      dispatch(setCareerErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCareerCrud());
      }, 50);
    }
  };
};

export const deleteCareer = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.delete(`/academic/careers/${form.id}`);
      dispatch(
        onCareerCrud({
          crud: "DELETED",
          career: form,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetCareerCrud());
      }, 50);
    } catch (error) {
      dispatch(setCareerErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCareerCrud());
      }, 50);
    }
  };
};

// classrooms:

export const getAllClassrooms = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/academic/classrooms`);
      dispatch(setClassrooms(data.data));
    } catch (error) {
      dispatch(setClassroomErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassroomCrud());
      }, 50);
    }
  };
};

export const saveClassroom = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.post(`/academic/classrooms`, form);
      dispatch(
        onClassroomCrud({
          crud: "CREATED",
          classroom: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetClassroomCrud());
      }, 50);
    } catch (error) {
      dispatch(setClassroomErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassroomCrud());
      }, 50);
    }
  };
};

export const updateClassroom = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.put(
        `/academic/classrooms/${form.id}`,
        form
      );
      dispatch(
        onClassroomCrud({
          crud: "UPDATED",
          classroom: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetClassroomCrud());
      }, 50);
    } catch (error) {
      dispatch(setClassroomErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassroomCrud());
      }, 50);
    }
  };
};

export const deleteClassroom = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.delete(
        `/academic/classrooms/${form.id}`
      );
      dispatch(
        onClassroomCrud({
          crud: "DELETED",
          classroom: form,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetClassroomCrud());
      }, 50);
    } catch (error) {
      dispatch(setClassroomErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassroomCrud());
      }, 50);
    }
  };
};

// classrooms careers

export const getAllClassroomsCareers = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/academic/classrooms-careers`);
      dispatch(setClassroomsCareers(data.data));
    } catch (error) {
      dispatch(setClassroomCareerErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassroomCareerCrud());
      }, 50);
    }
  };
};

export const getAllClassroomsCareerByCareerId = (careerId) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(
        `/academic/classrooms-careers/careerId/${careerId}`
      );
      dispatch(setClassroomsCareerByCareerId(data.data));
    } catch (error) {
      dispatch(setClassroomCareerErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassroomCareerCrud());
      }, 50);
    }
  };
};

export const saveClassroomCareer = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.post(
        `/academic/classrooms-careers`,
        form
      );
      dispatch(
        onClassroomCareerCrud({
          crud: "CREATED",
          classroomCareer: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetClassroomCareerCrud());
      }, 50);
    } catch (error) {
      dispatch(setClassroomCareerErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassroomCareerCrud());
      }, 50);
    }
  };
};

export const updateClassroomCareer = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.put(
        `/academic/classrooms-careers/${form.id}`,
        form
      );
      dispatch(
        onClassroomCareerCrud({
          crud: "UPDATED",
          classroomCareer: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetClassroomCareerCrud());
      }, 50);
    } catch (error) {
      dispatch(setClassroomCareerErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassroomCareerCrud());
      }, 50);
    }
  };
};

export const deleteClassroomCareer = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.delete(
        `/academic/classrooms-careers/${form.id}`
      );
      dispatch(
        onClassroomCareerCrud({
          crud: "DELETED",
          classroomCareer: form,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetClassroomCareerCrud());
      }, 50);
    } catch (error) {
      dispatch(setClassroomCareerErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassroomCareerCrud());
      }, 50);
    }
  };
};

// cycles:

export const getAllCycles = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/academic/cycles`);
      dispatch(setCycles(data.data));
    } catch (error) {
      dispatch(setCycleErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCycleCrud());
      }, 50);
    }
  };
};

export const saveCycle = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.post(`/academic/cycles`, form);
      dispatch(
        onCycleCrud({
          crud: "CREATED",
          cycle: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetCycleCrud());
      }, 50);
    } catch (error) {
      dispatch(setCycleErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCycleCrud());
      }, 50);
    }
  };
};

export const updateCycle = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.put(
        `/academic/cycles/${form.id}`,
        form
      );
      dispatch(
        onCycleCrud({
          crud: "UPDATED",
          cycle: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetCycleCrud());
      }, 50);
    } catch (error) {
      dispatch(setCycleErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCycleCrud());
      }, 50);
    }
  };
};

export const deleteCycle = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.delete(`/academic/cycles/${form.id}`);
      dispatch(
        onCycleCrud({
          crud: "DELETED",
          cycle: form,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetCycleCrud());
      }, 50);
    } catch (error) {
      dispatch(setCycleErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCycleCrud());
      }, 50);
    }
  };
};

// courseTypes:

export const getAllCourseTypes = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/academic/course-types`);
      dispatch(setCourseTypes(data.data));
    } catch (error) {
      dispatch(setCourseTypeErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCourseTypeCrud());
      }, 50);
    }
  };
};

export const saveCourseType = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.post(`/academic/course-types`, form);
      dispatch(
        onCourseTypeCrud({
          crud: "CREATED",
          courseType: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetCourseTypeCrud());
      }, 50);
    } catch (error) {
      dispatch(setCourseTypeErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCourseTypeCrud());
      }, 50);
    }
  };
};

export const updateCourseType = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.put(
        `/academic/course-types/${form.id}`,
        form
      );
      dispatch(
        onCourseTypeCrud({
          crud: "UPDATED",
          courseType: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetCourseTypeCrud());
      }, 50);
    } catch (error) {
      dispatch(setCourseTypeErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCourseTypeCrud());
      }, 50);
    }
  };
};

export const deleteCourseType = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.delete(
        `/academic/course-types/${form.id}`
      );
      dispatch(
        onCourseTypeCrud({
          crud: "DELETED",
          courseType: form,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetCourseTypeCrud());
      }, 50);
    } catch (error) {
      dispatch(setCourseTypeErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCourseTypeCrud());
      }, 50);
    }
  };
};

// course:

export const getAllCourses = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/academic/courses`);
      dispatch(setCourses(data.data));
    } catch (error) {
      dispatch(setCourseErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCourseCrud());
      }, 50);
    }
  };
};

export const getCoursesByCycle = (cycleId) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(
        `/academic/courses/cycleId/${cycleId}`
      );
      dispatch(setCoursesByCycle(data.data));
    } catch (error) {
      dispatch(setCourseErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCourseCrud());
      }, 50);
    }
  };
};

export const saveCourse = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.post(`/academic/courses`, form);
      dispatch(
        onCourseCrud({
          crud: "CREATED",
          course: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetCourseCrud());
      }, 50);
    } catch (error) {
      dispatch(setCourseErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCourseCrud());
      }, 50);
    }
  };
};

export const updateCourse = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.put(
        `/academic/courses/${form.id}`,
        form
      );
      dispatch(
        onCourseCrud({
          crud: "UPDATED",
          course: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetCourseCrud());
      }, 50);
    } catch (error) {
      dispatch(setCourseErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCourseCrud());
      }, 50);
    }
  };
};

export const updateStatusCourse = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.put(
        `/academic/courses/status/${form.id}`,
        form
      );
      dispatch(
        onCourseCrud({
          crud: "UPDATED",
          course: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetCourseCrud());
      }, 50);
    } catch (error) {
      dispatch(setCourseErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCourseCrud());
      }, 50);
    }
  };
};

export const deleteCourse = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.delete(`/academic/courses/${form.id}`);
      dispatch(
        onCourseCrud({
          crud: "DELETED",
          course: form,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetCourseCrud());
      }, 50);
    } catch (error) {
      dispatch(setCourseErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetCourseCrud());
      }, 50);
    }
  };
};

// totals:
export const getTotalsAcademic = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/academic/totals`);
      dispatch(setTotals(data.data));
    } catch (error) {
      console.log("Error al obtener totales de datos academicos");
    }
  };
};
