import { intranetApi } from "src/api";
import {
  onStudentCreated,
  onStudentDeleted,
  onStudentUpdated,
  onStudentsChanging,
  resetDataStudent,
  setErrorStudentsMessage,
  setSuccessStudentsMessage,
  setStudents,
  startLoadingStudents,
} from "../students";

export const getAllStudents = () => {
  return async (dispatch) => {
    dispatch(startLoadingStudents());
    try {
      const { data } = await intranetApi.get(`/academic/students`);
      dispatch(setStudents(data.data));
    } catch (error) {
      dispatch(setErrorStudentsMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(setErrorStudentsMessage(undefined));
      }, 50);
    }
  };
};

export const saveStudent = (form) => {
  return async (dispatch) => {
    dispatch(onStudentsChanging("creating"));
    try {
      const { data } = await intranetApi.post("/user/create", form);
      dispatch(onStudentCreated({ user: data.data, message: data.message }));
      setTimeout(() => {
        dispatch(setSuccessStudentsMessage(undefined));
        dispatch(resetDataStudent());
      }, 50);
    } catch (error) {
      dispatch(setErrorStudentsMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(setErrorStudentsMessage(undefined));
      }, 50);
    }
  };
};

export const updateStatusStudent = (form) => {
  return async (dispatch) => {
    dispatch(onStudentsChanging("editing"));
    try {
      const { data } = await intranetApi.put(`/user/update/${form.id}`, form);
      dispatch(onStudentUpdated({ user: data.data, message: data.message }));
      setTimeout(() => {
        dispatch(setSuccessStudentsMessage(undefined));
        dispatch(resetDataStudent());
      }, 50);
    } catch (error) {
      dispatch(setErrorStudentsMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(setErrorStudentsMessage(undefined));
      }, 50);
    }
  };
};

export const deleteStudent = (form) => {
  return async (dispatch) => {
    dispatch(onStudentsChanging("deleting"));
    try {
      const { data } = await intranetApi.delete(`/user/delete/${form.id}`);
      dispatch(onStudentDeleted({ user: data.data, message: data.message }));
      setTimeout(() => {
        dispatch(setSuccessStudentsMessage(undefined));
        dispatch(resetDataStudent());
      }, 50);
    } catch (error) {
      dispatch(setErrorStudentsMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(setErrorStudentsMessage(undefined));
      }, 50);
    }
  };
};

export const updateStudent = (form) => {
  return async (dispatch) => {
    dispatch(onStudentsChanging("editing"));
    try {
      const { data } = await intranetApi.put(`/user/update/${form.id}`, form);
      dispatch(onStudentUpdated({ user: data.data, message: data.message }));
      setTimeout(() => {
        dispatch(setSuccessStudentsMessage(undefined));
        dispatch(resetDataStudent());
      }, 50);
    } catch (error) {
      dispatch(setErrorStudentsMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(setErrorStudentsMessage(undefined));
      }, 50);
    }
  };
};
