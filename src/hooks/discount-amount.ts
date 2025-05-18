import { useMutation } from "@tanstack/react-query";
import { getDiscountAmount } from "../api/usersApi";

export const useGetDiscountAmount = () => {
  return useMutation({
    mutationFn: getDiscountAmount,
    mutationKey: ["get-discount-code"],
  });
};
