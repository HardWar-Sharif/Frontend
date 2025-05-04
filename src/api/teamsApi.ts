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
