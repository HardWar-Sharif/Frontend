import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://188.245.205.57:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
