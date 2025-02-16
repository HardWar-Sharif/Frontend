import { useMutation } from "@tanstack/react-query";
import { sendCode } from "../api/usersApi";

export const useSendCode = () => {
  return useMutation({
    mutationFn: sendCode,
    mutationKey: ["send-verification-code"],
  });
};
