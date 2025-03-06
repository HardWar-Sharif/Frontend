import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "@/hooks/auth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const tokenIsValid = useAuthStore((state) => state.isValid);

  if (tokenIsValid) return children;
  else return <Navigate to="/login" />;
};

export default ProtectedRoute;
