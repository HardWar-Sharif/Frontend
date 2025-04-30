import { useMutation } from "@tanstack/react-query";
import { join } from "../api/teamsApi";

export const useJoinTeam = () => {
  return useMutation({
    mutationFn: join,
    mutationKey: ["join-team"],
  });
};
