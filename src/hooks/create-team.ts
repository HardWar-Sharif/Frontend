import { useMutation } from "@tanstack/react-query";
import { create } from "../api/teamsApi";

export const useCreateTeam = () => {
  return useMutation({
    mutationFn: create,
    mutationKey: ["create-team"],
  });
};
