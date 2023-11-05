import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return(
    <>
      <div className="bg-home-background bg-cover bg-center h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col bg-[#c0cfe6] bg-opacity-75 w-[40%] items-center justify-center p-12 rounded">
          <h2>No Page Found Go back to Home</h2>
          <Link to='/' className="px-8 py-4 bg-[#b74b0d] text-white hover:bg-[#cb5412] transition:bg">Home</Link>
        </div>
      </div>
    </>
  );
}

export default NoMatch;