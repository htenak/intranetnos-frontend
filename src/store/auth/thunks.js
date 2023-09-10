import { clearErrorMessage, onChecking, onLogin, onLogout } from "../auth";
import { intranetApi } from "src/api";

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
