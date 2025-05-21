import { useMutation } from "@tanstack/react-query";
import { getQuestion } from "@/api/questionsApi";

export const useGetQuestion = (questionNumber: number) => {
  return useMutation({
    mutationFn: () => getQuestion(questionNumber),
    mutationKey: ["get-question", questionNumber],
  });
};
