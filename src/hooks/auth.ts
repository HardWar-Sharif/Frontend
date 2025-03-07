import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  isValid: () => boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isValid: () => {
        const token = get().token;
        if (token) {
          const { exp } = jwtDecode(token);
          if (exp && Date.now() < exp * 1000) return true;
        }
        set({ token: null });
        return false;
      },
      setToken: (token) => {
        set({ token });
      },
      clearToken: () => {
        set({ token: null });
      },
    }),
    { name: "auth-store" }
  )
);
