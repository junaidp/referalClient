import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoutes = ({ children }) => {
  const { token } = useSelector((state) => state?.common);
  if (token) {
    return <Navigate to="/referral" />;
  }
  return children;
};


export default ProtectRoutes;