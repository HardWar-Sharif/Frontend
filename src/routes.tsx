import { Routes, Route, Outlet, BrowserRouter } from "react-router";
import NavBar from "./components/ui/NavBar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Main/Dashboard";
import Signup from "./pages/Signup";
import Profile from "./pages/Main/Profile";
import MainPage from "./pages/Main";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ReactNode } from "react";
import Team from "./pages/Main/TeamUp";
import Verification from "./pages/Verification";
import PaymentResult from "./pages/Main/PaymentResult";
import StaffPage from "./pages/Staff";
import NotFound from "./pages/404";
import Conditions from "./pages/condition";
import QuestionsPage from "./pages/QuestionsPage";
import Shop from "@/pages/Main/Shop.tsx";
import Purchased from "./pages/Main/Purchased";

const AppRoutes = () => {
  const protectedPage = (page: ReactNode, verify: boolean = false) => (
    <ProtectedRoute isVerifyPage={verify}>{page}</ProtectedRoute>
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar position="fixed" zIndex={3} />
              <Outlet />
            </>
          }
        >
          <Route index element={<Landing />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="staff-members" element={<StaffPage />} />
          <Route
            path="verify"
            element={protectedPage(<Verification />, true)}
          />
          <Route element={protectedPage(<MainPage />)}>
            <Route path="dashboard" element={protectedPage(<Dashboard />)} />
            <Route path="profile" element={protectedPage(<Profile />)} />
            <Route path="team" element={protectedPage(<Team />)} />
            <Route path="shop" element={protectedPage(<Shop />)} />
            <Route path="purchased" element={protectedPage(<Purchased />)} />
          </Route>
          <Route
            path="payment-result"
            element={protectedPage(<PaymentResult />)}
          />
          <Route path="conditions" element={<Conditions />} />
          <Route path="questions" element={protectedPage(<QuestionsPage />)} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
