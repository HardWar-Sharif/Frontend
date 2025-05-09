import { useMutation } from "@tanstack/react-query";
import {buyItem, login} from "../api/usersApi";

export const shopPurchase = () => {
  return useMutation({
    mutationFn: buyItem,
    mutationKey: ["login"],
  });
};
