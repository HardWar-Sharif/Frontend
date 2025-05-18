import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../api/usersApi";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
    mutationKey: ["profile"],
  });
};
