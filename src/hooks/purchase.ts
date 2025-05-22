import { purchaseComponent } from "@/api/teamsApi";
import { useMutation } from "@tanstack/react-query";

export const usePurchaseComponent = () => {
  return useMutation({
    mutationFn: purchaseComponent,
    mutationKey: ["purchase-component"],
  });
};
