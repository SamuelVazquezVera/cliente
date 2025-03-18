import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate, Outlet } from "react-router-dom";
import NavBar from '../components/superadmin/NavBar';

const SuperAdmin = () => {
    const { user } = useAuth();
    if (user.role === "superadmin") {
      return (
        <div className="bg-white">
          <NavBar />
          <Outlet></Outlet>
        </div>
      );
    } else {
      return <Navigate to="/login" />;
    }
  };

export default SuperAdmin