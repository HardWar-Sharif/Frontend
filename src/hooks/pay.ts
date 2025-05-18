import { useMutation } from "@tanstack/react-query";
import { pay } from "../api/usersApi";

export const usePay = () => {
  return useMutation({
    mutationFn: pay,
    mutationKey: ["pay"],
  });
};
