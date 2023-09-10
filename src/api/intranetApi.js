import axios from "axios";
import { store } from "src/store";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// interceptor para agregar token a las solicitudes
axiosInstance.interceptors.request.use(
  (config) => {
    // verificar si es una solicitud de login
    const isLoginRequest = config.url.includes("/auth/login");
    if (!isLoginRequest) {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
