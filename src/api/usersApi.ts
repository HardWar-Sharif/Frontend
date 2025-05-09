import axiosInstance from "./axiosInstance";
import {ShopItem} from "@/types/shopItem";

export const signup = async (payload: UserSignup) => {
  const response = await axiosInstance.post(`/users/signup/`, payload);
  return response.data;
};

export const sendCode = async (payload: UserVerification) => {
  const response = await axiosInstance.post(`/users/verify/`, payload);
  return response.data;
};

export const login = async (payload: UserLogin) => {
  const response = await axiosInstance.post(`/users/login/`, payload);
  return response.data;
};

export const buyItem = async (payload: UserLogin) => {
  const response = await axiosInstance.post(`/shop/buy`, payload);
  return response.data;
};

export const profile = async (payload: UserProfile) => {
  const response = await axiosInstance.put(`/users/profile/`, payload);
  return response.data;
};

export const team = async () => {
  const response = await axiosInstance.get(`/users/team/my`);
  return {
    data: response.data,
    status: response.status,
  };
};

export const shop = async (): Promise<{ data: ShopItem[]; status: number }> => {
  const response = await axiosInstance.get(`/shop`);
  return {
    data: response.data,
    status: response.status,
  };
};

// export const shop = async (): Promise<{ data: ShopItem[]; status: number }> => {
//   // Mock response without hitting backend
//   return {
//     status: 200,
//     data: [
//       {
//         id: "1",
//         name: "Mock Item A",
//         image: "/shop/red-potion.png",
//         cost: 50,
//       },
//       {
//         id: "2",
//         name: "Mock Item B",
//         image: "/shop/blue-elixir.png",
//         cost: 75,
//       },
//       {
//         id: "3",
//         name: "Mock Item C",
//         image: "/shop/blue-elixir.png",
//         cost: 75,
//       },
//       {
//         id: "4",
//         name: "Mock Item D",
//         image: "/shop/blue-elixir.png",
//         cost: 75,
//       },
//       {
//         id: "5",
//         name: "Mock Item E",
//         image: "/shop/blue-elixir.png",
//         cost: 75,
//       },
//       {
//         id: "6",
//         name: "Mock Item F",
//         image: "/shop/blue-elixir.png",
//         cost: 75,
//       },
//       {
//         id: "7",
//         name: "Mock Item G",
//         image: "/shop/blue-elixir.png",
//         cost: 75,
//       },
//       {
//         id: "8",
//         name: "Mock Item H",
//         image: "/shop/blue-elixir.png",
//         cost: 75,
//       },
//     ],
//   };
// };
