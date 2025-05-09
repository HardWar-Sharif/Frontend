import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "@/stores/auth";
import { useIsVerified } from "@/hooks/is-verified";
import { Skeleton } from "@chakra-ui/react";

interface ProtectedRouteProps {
  isVerifyPage?: boolean
  children: ReactNode;
}

const ProtectedRoute = ({ isVerifyPage = false, children }: ProtectedRouteProps) => {
  const tokenIsValid = useAuthStore((state) => state.isValid);
  const { data, isLoading } = useIsVerified();

  if (!tokenIsValid()) return <Navigate to={"/login"} />;
  if (isVerifyPage) return children;
  if (isLoading) return <Skeleton />;
  if (!data?.is_verified) return <Navigate to={"/verify"} />;
  return children;
};

export default ProtectedRoute;
