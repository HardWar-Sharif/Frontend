import axiosInstance from "./axiosInstance";

export const create = async (payload: CreateTeam) => {
  const response = await axiosInstance.post(`/teams/create/`, payload);
  return response.data;
};

export const join = async (teamCode: string) => {
  const response = await axiosInstance.post(`/teams/join/${teamCode}/`);
  return response.data;
};

export const leave = async () => {
  const response = await axiosInstance.post(`/teams/leave/`);
  return response.data;
};

export const getComponents = async () => {
  const response = await axiosInstance.get(`/teams/components/`);
  return response.data;
};

export const purchaseComponent = async (payload: PurchaseComponent) => {
  const response = await axiosInstance.post(`/teams/purchase/`, payload);
  return response.data;
};

export const purchasedComponents = async () => {
  const response = await axiosInstance.get(`/teams/purchases/`);
  return response.data;
};
