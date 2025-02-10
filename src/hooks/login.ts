import { useMutation } from "@tanstack/react-query";
import { login } from "../api/usersApi";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    mutationKey: ["login"],
  });
};
