import axiosInstance from "./axiosInstance";

export const getQuestions = async () => {
  const response = await axiosInstance.get(`/questions/`);
  return response.data;
};

export const getQuestion = async (questionNumber: number) => {
  const response = await axiosInstance.get(`/questions/${questionNumber}/`);
  return response.data;
};
