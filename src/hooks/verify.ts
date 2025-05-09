import { useMutation } from "@tanstack/react-query";
import { verify } from "../api/usersApi";

export const useVerify = () => {
  return useMutation({
    mutationFn: verify,
    mutationKey: ["verify"],
  });
};
