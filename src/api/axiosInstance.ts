import { useAuthStore } from "@/hooks/auth";
import axios from "axios";

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
      const token = useAuthStore((state) => state.token);
      const tokenIsValid = useAuthStore((state) => state.isValid);
      if (tokenIsValid) {
        config.headers.Authorization = `auth ${token}`;
        return config;
      }
      window.location.href = "/login";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
