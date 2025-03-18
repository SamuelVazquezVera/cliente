import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";
import NavBarSecurity from "../components/seguridad/NavBarSecurity";
const Seguridad = () => {
    const { user } = useAuth();
    if (user.role === "seguridad") {
      return (
        <div className="bg-white">
          <NavBarSecurity />
          <Outlet></Outlet>
        </div>
      );
    } else {
      return <Navigate to="/login" />;
    }
  };
  
  export default Seguridad;