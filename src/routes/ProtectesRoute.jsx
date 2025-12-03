import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const ProtectedRoute = ({ only }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (only && !only.includes(user?.rol)) return <Navigate to="/" />;

  return <Outlet />; // Renderiza las sub-rutas
};