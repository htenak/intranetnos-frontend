import { toast } from "react-toastify";

import { onLogin } from "./authSlice";
import { intranetURL } from "src/api";

export const login = (form) => {
  return async (dispatch) => {
    try {
      // const { data } = await intranetURL.post("/auth/login/", form);
      // if (data.statusCode === 200) {
      //   dispatch(onLogin(data.data));
      // }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
