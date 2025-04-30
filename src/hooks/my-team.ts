import { useQuery } from "@tanstack/react-query";
import { team } from "../api/usersApi";

export const useGetMyTeam = () => {
  return useQuery({
    queryFn: team,
    queryKey: ["my-team"],
  });
};
