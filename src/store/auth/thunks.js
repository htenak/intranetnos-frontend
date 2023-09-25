import { intranetApi } from "src/api";
import {
  clearErrorMessage,
  clearSuccessMessage,
  onChecking,
  onLogin,
  onLogout,
  onMyDataCancelEditing,
  onMyDataEditing,
  onMyDataUpdated,
} from "../auth";

export const login = (form) => {
  return async (dispatch) => {
    dispatch(onChecking());
    try {
      const { data } = await intranetApi.post("/auth/login/", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin(data.data));
    } catch (error) {
      dispatch(onLogout(error.response.data?.message || ""));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 50);
    }
  };
};

export const checkAuthToken = () => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    if (!token) {
      dispatch(onLogout());
      return;
    }
    try {
      const { data } = await intranetApi.get(`/auth/renew/${token}`);
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin(data.data));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };
};

export const logout = () => {
  localStorage.clear();
  return async (dispatch) => {
    dispatch(onLogout());
  };
};

export const updateMyData = (form) => {
  return async (dispatch) => {
    dispatch(onMyDataEditing());
    try {
      const { data } = await intranetApi.put("/user/my-profile/update", form);
      dispatch(onMyDataUpdated({ user: data.data, message: data.message }));
      setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 50);
    } catch (error) {
      if (Array.isArray(error.response.data.message)) {
        dispatch(onMyDataCancelEditing(error.response.data?.message[0] || ""));
      } else {
        dispatch(onMyDataCancelEditing(error.response.data?.message || ""));
      }
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 50);
    }
  };
};
