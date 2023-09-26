import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

import { useSelector } from "react-redux";

const AnimatedRoutes = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {userInfo ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Home />} />
        )}
      </Routes>
    </>
  );
};

export default AnimatedRoutes;
