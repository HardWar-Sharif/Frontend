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

const AppRoutes = () => {
  const protectedPage = (page: ReactNode) => (
    <ProtectedRoute>{page}</ProtectedRoute>
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar position="fixed" backgroundColor="black" zIndex={3} />
              <Outlet />
            </>
          }
        >
          <Route index element={<Landing />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route element={protectedPage(<MainPage />)}>
            <Route path="dashboard" element={protectedPage(<Dashboard />)} />
            <Route path="profile" element={protectedPage(<Profile />)} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
