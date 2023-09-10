import axios from "axios";

const intranetApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// interceptor para agregar token a las solicitudes
intranetApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return config;
});

export default intranetApi;
