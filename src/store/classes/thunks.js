import { intranetApi } from "src/api";
import {
  setClasses,
  setClass,
  onClassCrud,
  resetClassCrud,
  setClassErrorMessage,
} from "../classes";

// careers:

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
      //   setTimeout(() => {
      //     dispatch(resetClassCrud());
      //   }, 50);
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
