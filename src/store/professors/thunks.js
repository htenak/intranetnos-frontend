import { intranetApi } from "src/api";
import {
  setProfessors,
  onProfessorCreated,
  onProfessorDeleted,
  onProfessorUpdated,
  resetDataProfessor,
  setErrorProfessorsMessage,
} from "../professors";

export const getAllProfessors = () => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.get(`/academic/professors`);
      dispatch(setProfessors(data.data));
    } catch (error) {
      dispatch(setErrorProfessorsMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetDataProfessor(undefined));
      }, 50);
    }
  };
};

export const saveProfessor = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.post("/user/create", form);
      dispatch(
        onProfessorCreated({ professor: data.data, message: data.message })
      );
      setTimeout(() => {
        dispatch(resetDataProfessor());
      }, 50);
    } catch (error) {
      dispatch(setErrorProfessorsMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetDataProfessor());
      }, 50);
    }
  };
};

export const updateStatusProfessor = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.put(`/user/update/${form.id}`, form);
      dispatch(
        onProfessorUpdated({ professor: data.data, message: data.message })
      );
      setTimeout(() => {
        dispatch(resetDataProfessor());
      }, 50);
    } catch (error) {
      dispatch(setErrorProfessorsMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetDataProfessor());
      }, 50);
    }
  };
};

export const deleteProfessor = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.delete(`/user/delete/${form.id}`);
      dispatch(
        onProfessorDeleted({ professor: data.data, message: data.message })
      );
      setTimeout(() => {
        dispatch(resetDataProfessor());
      }, 50);
    } catch (error) {
      dispatch(setErrorProfessorsMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetDataProfessor());
      }, 50);
    }
  };
};

export const updateProfessor = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await intranetApi.put(`/user/update/${form.id}`, form);
      dispatch(
        onProfessorUpdated({ professor: data.data, message: data.message })
      );
      setTimeout(() => {
        dispatch(resetDataProfessor());
      }, 50);
    } catch (error) {
      dispatch(setErrorProfessorsMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(resetDataProfessor());
      }, 50);
    }
  };
};
