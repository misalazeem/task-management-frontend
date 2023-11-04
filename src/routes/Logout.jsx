import React from "react";
import AuthService from "../providers/AuthService";
import { Navigate, useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const logout = AuthService.logout();
    navigate("/");  
  }
    
  return(
    <>
      <div className="bg-home-background bg-cover bg-center h-screen flex flex-col items-center justify-center">
        <div className="flex flex-row bg-[#c0cfe6] bg-opacity-75 w-[40%] items-center justify-center p-12 rounded">
          <button type="submit" onClick={handleLogout} className="px-8 py-4 bg-[#b74b0d] text-white hover:bg-[#cb5412] transition:bg">Logout</button>
        </div>
      </div>
    </>
  );
}

export default Logout;