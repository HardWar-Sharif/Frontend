import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/usersApi";
import { useAuthStore } from "@/stores/auth";

export const useGetProfile = () => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    queryFn: getProfile,
    queryKey: ["user-profile", token],
  });
};
