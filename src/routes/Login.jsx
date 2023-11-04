import React, { useState, useEffect } from "react";
import AuthService from "../providers/AuthService";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../customHooks/useUser";

const Login = () => {
  const navigate = useNavigate();
  const { data: user } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return(
    <>
      <div className="bg-home-background bg-cover bg-center h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col bg-[#c0cfe6] bg-opacity-75 items-center justify-center p-12 rounded">
          <form className="flex flex-col" onSubmit={handleLogin}>
            <input
              name="email"
              placeholder="Email"
              type="email"
              className="p-2 mb-2"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              name="password"
              placeholder="Password"
              type="password"
              className="p-2 mb-2"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button type="submit" className="px-4 py-2 bg-[#b74b0d] text-white hover:bg-[#cb5412] transition:bg">
              Login
            </button>
          </form>
          <Link to="/signup">Click here to Signup</Link>
        </div>
      </div>
    </>
  );
}

export default Login;