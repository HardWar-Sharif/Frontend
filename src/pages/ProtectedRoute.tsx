import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "@/stores/auth";
import { Skeleton } from "@chakra-ui/react";
import { useGetProfile } from "@/hooks/get-profile";
import { useHasPaid } from "@/hooks/has-paid";

interface ProtectedRouteProps {
  isVerifyPage?: boolean;
  children: ReactNode;
}

const ProtectedRoute = ({
  isVerifyPage = false,
  children,
}: ProtectedRouteProps) => {
  const tokenIsValid = useAuthStore((state) => state.isValid);
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: payment, isLoading: paymentLoading } = useHasPaid();
  const { pathname } = useLocation();

  if (!tokenIsValid()) return <Navigate to={"/login"} />;
  if (isVerifyPage) return children;
  if (profileLoading || paymentLoading) return <Skeleton height="500px" />;
  if (!profile?.is_verified) return <Navigate to={"/verify"} />;
  if (pathname == "/team" && (!profile?.is_completed || !payment.has_paid))
    return <Navigate to={"/dashboard"} />;
  return children;
};

export default ProtectedRoute;
