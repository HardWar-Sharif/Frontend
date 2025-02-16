import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://hardwar-sharif.ir:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
