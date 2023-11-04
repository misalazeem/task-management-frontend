import React from "react";
import NavBar from "../components/NavBar";
import Tasks from "../components/Tasks";

const Dashboard = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-purple-300 via-pink-300 to-red-300 min-h-screen">
        <NavBar />
        <div className="p-12">
          <Tasks />
        </div>
      </div>
    </>
  );
}

export default Dashboard;