import { useMutation } from "@tanstack/react-query";
import { leave } from "../api/teamsApi";

export const useLeaveTeam = () => {
  return useMutation({
    mutationFn: leave,
    mutationKey: ["leave-team"],
  });
};
