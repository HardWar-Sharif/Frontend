import { useQuery } from "@tanstack/react-query";
import { team } from "../api/usersApi";
import { useAuthStore } from "@/stores/auth";

export const useGetMyTeam = () => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    queryFn: team,
    queryKey: ["my-team", token],
  });
};
