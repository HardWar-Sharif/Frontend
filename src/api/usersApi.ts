import axiosInstance from "./axiosInstance";

export const signup = async (payload: UserCredentials) => {
  const response = await axiosInstance.post(`/users/signup/`, payload);
  return response.data;
};

export const login = async (payload: UserCredentials) => {
  const response = await axiosInstance.post(`/users/login/`, payload);
  return response.data;
};
