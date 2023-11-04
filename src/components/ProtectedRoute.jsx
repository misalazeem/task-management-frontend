import React from "react";
import { Outlet } from "react-router-dom";
import useProtectedRoute from "../customHooks/useProtectedRoute";

const ProtectedRoute = () => {
  const { data, error, isLoading } = useProtectedRoute();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
