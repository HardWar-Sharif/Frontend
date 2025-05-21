import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "@/api/questionsApi";

export const useGetQuestions = () => {
  return useQuery({
    queryFn: getQuestions,
    queryKey: ["get-questions"],
  });
};
