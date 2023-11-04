import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="flex flex-row justify-between align-center px-12 py-4">
        <h1>Task Management</h1>
        <Link to='/logout'>Logout</Link >
      </div>
    </>
  );
}

export default NavBar;