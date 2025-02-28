import { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("AuthToken");

  if (token) {
    const { exp } = jwtDecode(token);
    if (exp && Date.now() < exp * 1000) return children;
  }
  localStorage.removeItem("AuthToken");
  return <Navigate to={"/login"} />;
};

export default ProtectedRoute;
