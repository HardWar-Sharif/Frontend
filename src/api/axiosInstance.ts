import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: "https://api.hardwar-sharif.ir/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const publicEndpoints = ["/signup", "/login", "/verify"];

axiosInstance.interceptors.request.use(
  (config) => {
    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!isPublicEndpoint) {
      const token = localStorage.getItem("AuthToken");
      if (token) {
        const { exp } = jwtDecode(token);
        if (exp && Date.now() < exp * 1000) {
          config.headers.Authorization = token;
          return config;
        }
      }
      localStorage.removeItem("AuthToken");
      window.location.href = "/login";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
