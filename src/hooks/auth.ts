import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  isValid: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isValid: false,
      setToken: (token) => {
        try {
          const { exp } = jwtDecode(token);
          if (!exp || Date.now() > exp * 1000) {
            set({ token: null, isValid: false });
          } else {
            set({ token, isValid: true });
          }
        } catch (error) {
          console.error("Invalid token:", error);
          set({ token: null, isValid: false });
        }
      },
      clearToken: () => {
        set({ token: null, isValid: false });
      },
    }),
    { name: "auth-storage" }
  )
);
