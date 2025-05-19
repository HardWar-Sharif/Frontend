import { useMutation } from "@tanstack/react-query";
import { hasPaid } from "../api/usersApi";

export const useHasPaid = () => {
  return useMutation({
    mutationFn: hasPaid,
    mutationKey: ["has-paid"],
  });
};
