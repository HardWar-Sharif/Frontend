import { Routes, Route, Outlet, BrowserRouter } from "react-router";
import NavBar from "./components/ui/NavBar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Main/Dashboard";
import Signup from "./pages/Signup";
import Profile from "./pages/Main/Profile";
import MainPage from "./pages/Main";

const AppRoutes = () => {
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
          <Route path="dashboard" element={<Dashboard />} />
          <Route element={<MainPage />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
