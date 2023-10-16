import { intranetApi } from "src/api";
import {
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
} from "../classes";

// classes:

export const getAllClasses = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/class/classes`);
      dispatch(setClasses(data.data));
    } catch (error) {
      dispatch(setClassErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassCrud());
      }, 50);
    }
  };
};

export const getClass = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/class/classes/${id}`);
      dispatch(setClass(data.data));
      setTimeout(() => {
        dispatch(resetClassCrud());
      }, 50);
    } catch (error) {
      dispatch(setClassErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassCrud());
      }, 50);
    }
  };
};

export const saveClass = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.post(`/class/classes`, form);
      dispatch(
        onClassCrud({
          crud: "CREATED",
          class: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetClassCrud());
      }, 50);
    } catch (error) {
      dispatch(setClassErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassCrud());
      }, 50);
    }
  };
};

export const updateClass = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.put(`/class/classes/${form.id}`, form);
      dispatch(
        onClassCrud({
          crud: "UPDATED",
          class: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetClassCrud());
      }, 50);
    } catch (error) {
      dispatch(setClassErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassCrud());
      }, 50);
    }
  };
};

export const deleteClass = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.delete(`/class/classes/${form.id}`);
      dispatch(
        onClassCrud({
          crud: "DELETED",
          class: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetClassCrud());
      }, 50);
    } catch (error) {
      dispatch(setClassErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetClassCrud());
      }, 50);
    }
  };
};

// students classes

export const getAllStudentsClassByClassId = (classId) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(
        `/class/student-classes/classId/${classId}`
      );
      dispatch(setStudentsClassByClassId(data.data));
    } catch (error) {
      dispatch(setStudentClassErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetStudentClassCrud());
      }, 50);
    }
  };
};

export const getAllStudentsClasses = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/class/student-classes`);
      dispatch(setStudentsClasses(data.data));
    } catch (error) {
      dispatch(setStudentClassErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetStudentClassCrud());
      }, 50);
    }
  };
};

export const getStudentClass = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/class/student-classes/${id}`);
      dispatch(setStudentClass(data.data));
      setTimeout(() => {
        dispatch(resetStudentClassCrud());
      }, 50);
    } catch (error) {
      dispatch(setStudentClassErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetStudentClassCrud());
      }, 50);
    }
  };
};

export const saveStudentClass = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.post(`/class/student-classes`, form);
      dispatch(
        onStudentClassCrud({
          crud: "CREATED",
          studentClass: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetStudentClassCrud());
      }, 50);
    } catch (error) {
      dispatch(setStudentClassErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetStudentClassCrud());
      }, 50);
    }
  };
};

export const updateStudentClass = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.put(
        `/class/student-classes/${form.id}`,
        form
      );
      dispatch(
        onStudentClassCrud({
          crud: "UPDATED",
          studentClass: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetStudentClassCrud());
      }, 50);
    } catch (error) {
      dispatch(setStudentClassErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetStudentClassCrud());
      }, 50);
    }
  };
};

export const deleteStudentClass = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.delete(
        `/class/student-classes/${form.id}`
      );
      dispatch(
        onStudentClassCrud({
          crud: "DELETED",
          studentClass: data.data,
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(resetStudentClassCrud());
      }, 50);
    } catch (error) {
      dispatch(setStudentClassErrorMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetStudentClassCrud());
      }, 50);
    }
  };
};
