import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/usersApi";

export const useGetProfile = () => {
  return useQuery({
    queryFn: getProfile,
    queryKey: ["user-profile"],
  });
};
