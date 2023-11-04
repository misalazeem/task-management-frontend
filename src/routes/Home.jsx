import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useUser from "../customHooks/useUser";

const Home = () => {
  const navigate = useNavigate();
  const { data: user } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return(
    <>
      <div className="bg-home-background bg-cover bg-center h-screen flex flex-col items-center justify-center">
        <div className="flex flex-row bg-[#c0cfe6] bg-opacity-75 w-[40%] items-center justify-center p-12 rounded">
          <Link to='/login' className="px-8 py-4 mr-8 bg-[#b74b0d] text-white hover:bg-[#cb5412] transition:bg">Login</Link>
          <Link to='/signup' className="px-8 py-4 bg-[#b74b0d] text-white hover:bg-[#cb5412] transition:bg">Signup</Link>
        </div>
      </div>
    </>
  );
}

export default Home;