import React from 'react'
import { useAuth } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";
import NavBarAdmin from '../components/admin/NavBarAdmin'

const Admin = () => {
    const { user } = useAuth();
    if (user.role === "admin") {
      return (
        <div className="bg-white">
          <NavBarAdmin />
          <Outlet></Outlet>
        </div>
      );
    } else {
      return <Navigate to="/login" />;
    }
  };

export default Admin