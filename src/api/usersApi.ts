import axiosInstance from "./axiosInstance";

export const signup = async (payload: UserSignup) => {
  const response = await axiosInstance.post(`/users/signup/`, payload);
  return response.data;
};

export const sendCode = async () => {
  const response = await axiosInstance.get(`/users/send-code/`);
  return response.data;
};

export const verify = async (payload: UserVerification) => {
  const response = await axiosInstance.post(`/users/verify/`, payload);
  return response.data;
};

export const hasPaid = async (authority: string) => {
  const response = await axiosInstance.get(`/payment?authority=${authority}`);
  return response.data;
};

export const getDiscountAmount = async (discount_code: string) => {
  const response = await axiosInstance.get(
    `/payment/discount?discount_code=${discount_code}`
  );
  return response.data;
};

export const pay = async (discount_code: string) => {
  const response = await axiosInstance.post(
    `/payment/?discount_code=${discount_code || ""}`
  );
  return response.data;
};

export const login = async (payload: UserLogin) => {
  const response = await axiosInstance.post(`/users/login/`, payload);
  return response.data;
};

export const profile = async (payload: UserProfile) => {
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