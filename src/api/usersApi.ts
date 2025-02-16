import axiosInstance from "./axiosInstance";

export const signup = async (payload: UserSignup) => {
  const response = await axiosInstance.post(`/users/signup/`, payload);
  return response.data;
};

export const sendCode = async (payload: UserVerification) => {
  const response = await axiosInstance.post(`/users/verify/`, payload);
  return response.data;
};

export const login = async (payload: UserLogin) => {
  const response = await axiosInstance.post(`/users/login/`, payload);
  return response.data;
};
