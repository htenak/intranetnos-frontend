import { intranetApi } from "src/api";
import {
  onUserCreated,
  onUserDeleted,
  onUsersChanging,
  onUserUpdated,
  resetDataUser,
  setErrorUsersMessage,
  setRoles,
  setSuccessUsersMessage,
  setUsers,
  startLoadingRoles,
  startLoadingUsers,
} from "../users";

export const getAllRoles = () => {
  return async (dispatch) => {
    dispatch(startLoadingRoles());
    try {
      const { data } = await intranetApi.get("/user/roles");
      dispatch(setRoles(data.data));
    } catch (error) {
      console.log("Error al consultar roles:", error.response.data?.message);
    }
  };
};

export const getAllUsers = (status) => {
  return async (dispatch) => {
    dispatch(startLoadingUsers());
    try {
      const { data } = await intranetApi.get(`/user/users?status=${status}`);
      dispatch(setUsers(data.data));
    } catch (error) {
      dispatch(setErrorUsersMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(setErrorUsersMessage(undefined));
      }, 50);
    }
  };
};

export const saveUser = (form) => {
  return async (dispatch) => {
    dispatch(onUsersChanging("creating"));
    try {
      const { data } = await intranetApi.post("/user/create", form);
      dispatch(onUserCreated({ user: data.data, message: data.message }));
      setTimeout(() => {
        dispatch(setSuccessUsersMessage(undefined));
        dispatch(resetDataUser());
      }, 50);
    } catch (error) {
      dispatch(setErrorUsersMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(setErrorUsersMessage(undefined));
      }, 50);
    }
  };
};

export const updateStatusUser = (form) => {
  return async (dispatch) => {
    dispatch(onUsersChanging("editing"));
    try {
      const { data } = await intranetApi.put(`/user/update/${form.id}`, form);
      dispatch(onUserUpdated({ user: data.data, message: data.message }));
      setTimeout(() => {
        dispatch(setSuccessUsersMessage(undefined));
        dispatch(resetDataUser());
      }, 50);
    } catch (error) {
      dispatch(setErrorUsersMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(setErrorUsersMessage(undefined));
      }, 50);
    }
  };
};

export const deleteUser = (form) => {
  return async (dispatch) => {
    dispatch(onUsersChanging("deleting"));
    try {
      const { data } = await intranetApi.delete(`/user/delete/${form.id}`);
      dispatch(onUserDeleted({ user: data.data, message: data.message }));
      setTimeout(() => {
        dispatch(setSuccessUsersMessage(undefined));
        dispatch(resetDataUser());
      }, 50);
    } catch (error) {
      dispatch(setErrorUsersMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(setErrorUsersMessage(undefined));
      }, 50);
    }
  };
};

export const updateUser = (form) => {
  return async (dispatch) => {
    dispatch(onUsersChanging("editing"));
    try {
      const { data } = await intranetApi.put(`/user/update/${form.id}`, form);
      dispatch(onUserUpdated({ user: data.data, message: data.message }));
      setTimeout(() => {
        dispatch(setSuccessUsersMessage(undefined));
        dispatch(resetDataUser());
      }, 50);
    } catch (error) {
      dispatch(setErrorUsersMessage(error.response.data?.message));
      setTimeout(() => {
        dispatch(setErrorUsersMessage(undefined));
      }, 50);
    }
  };
};
