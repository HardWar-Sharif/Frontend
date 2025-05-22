import { purchasedComponents } from "@/api/teamsApi";
import { useQuery } from "@tanstack/react-query";

export const useGetPurchases = () => {
  return useQuery({
    queryFn: purchasedComponents,
    queryKey: ["get-purchases"],
  });
};
