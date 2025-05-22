import { getComponents } from "@/api/teamsApi";
import { useQuery } from "@tanstack/react-query";

export const useGetComponents = () => {
  return useQuery({
    queryFn: getComponents,
    queryKey: ["get-components"],
    refetchInterval: 5000,
  });
};
