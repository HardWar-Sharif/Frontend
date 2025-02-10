import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/usersApi";

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    mutationKey: ["signup"],
  });
};
