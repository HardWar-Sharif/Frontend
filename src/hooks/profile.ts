import { useMutation } from "@tanstack/react-query";
import { profile } from "../api/usersApi";

export const useProfile = () => {
  return useMutation({
    mutationFn: profile,
    mutationKey: ["profile"],
  });
};
