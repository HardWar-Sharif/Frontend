import { useQuery } from "@tanstack/react-query";
import { hasPaid } from "../api/usersApi";

export const useHasPaid = () => {
  return useQuery({
    queryFn: hasPaid,
    queryKey: ["has-paid"],
  });
};
