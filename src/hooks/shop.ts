import { useQuery } from "@tanstack/react-query";
import { shop } from "../api/usersApi";
import {ShopItem} from "@/types/shopItem";

export const useGetShopItems = () => {
  return useQuery<{ data: ShopItem[]; status: number }>({
    queryFn: shop,
    queryKey: ["shop-items"],
  });
};