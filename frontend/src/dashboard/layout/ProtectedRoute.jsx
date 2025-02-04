import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { active, usuario } = useSelector((state) => state.authentication);
  if (!usuario) {
    // user is not authenticated
    return <Navigate to="/iniciar-sesion" />;
  } else if (active && usuario.id_rol === 2) {
    // user is authenticated but not authorized
    return <Navigate to="/" />;
  } else {
    // user is authenticated and authorized
    return children;
  }
};