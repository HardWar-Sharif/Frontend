import { useQuery } from "@tanstack/react-query";
import { isVerified } from "../api/usersApi";

export const useIsVerified = () => {
  return useQuery({
    queryFn: isVerified,
    queryKey: ["is-verified"],
  });
};
