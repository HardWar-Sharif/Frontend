import axiosInstance from "./axiosInstance";

export const signup = async (payload: UserSignup) => {
  const response = await axiosInstance.post(`/users/signup/`, payload);
  return response.data;
};

export const sendCode = async () => {
  const response = await axiosInstance.get(`/users/send-code/`);
  return response.data;
};

export const isVerified = async () => {
  const response = await axiosInstance.get(`/users/is-verified/`);
  return response.data;
};

export const verify = async (payload: UserVerification) => {
  const response = await axiosInstance.post(`/users/verify/`, payload);
  return response.data;
};

export const hasPaid = async () => {
  const response = await axiosInstance.get(`/payment/`);
  return response.data;
};

export const pay = async (payload: UserPayment) => {
  const response = await axiosInstance.post(`/payment/`, payload);
  return response.data;
};

export const login = async (payload: UserLogin) => {
  const response = await axiosInstance.post(`/users/login/`, payload);
  return response.data;
};

export const updateProfile = async (payload: UserProfile) => {
  const response = await axiosInstance.put(`/users/profile/`, payload);
  return response.data;
};

export const getProfile = async () => {
  const response = await axiosInstance.get(`/users/profile/`);
  return response.data;
};

export const team = async () => {
  const response = await axiosInstance.get(`/users/team/my`);
  return {
    data: response.data,
    status: response.status,
  };
};
