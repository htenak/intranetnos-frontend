import { intranetApi } from "src/api";
import {
  setStudents,
  onStudentCreated,
  onStudentDeleted,
  onStudentUpdated,
  resetDataStudent,
  setErrorStudentsMessage,
} from "../students";

export const getAllStudents = () => {
  return async (dispatch) => {
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
    try {
      const { data } = await intranetApi.post("/user/create", form);
      dispatch(onStudentCreated({ student: data.data, message: data.message }));
      setTimeout(() => {
        dispatch(resetDataStudent());
      }, 50);
    } catch (error) {
      dispatch(setErrorStudentsMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetDataStudent());
      }, 50);
    }
  };
};

export const updateStatusStudent = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.put(`/user/update/${form.id}`, form);
      dispatch(onStudentUpdated({ student: data.data, message: data.message }));
      setTimeout(() => {
        dispatch(resetDataStudent());
      }, 50);
    } catch (error) {
      dispatch(setErrorStudentsMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetDataStudent());
      }, 50);
    }
  };
};

export const deleteStudent = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.delete(`/user/delete/${form.id}`);
      dispatch(onStudentDeleted({ student: data.data, message: data.message }));
      setTimeout(() => {
        dispatch(resetDataStudent());
      }, 50);
    } catch (error) {
      dispatch(setErrorStudentsMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetDataStudent());
      }, 50);
    }
  };
};

export const updateStudent = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.put(`/user/update/${form.id}`, form);
      dispatch(onStudentUpdated({ student: data.data, message: data.message }));
      setTimeout(() => {
        dispatch(resetDataStudent());
      }, 50);
    } catch (error) {
      dispatch(setErrorStudentsMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetDataStudent());
      }, 50);
    }
  };
};
