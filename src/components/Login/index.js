// src/components/Login.js
import React, { useState } from "react";
import "./login.css";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [user, setUser] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const submitHandler = () => {
    if (pathname === "/my-profile") {
      console.log(`Logged`, user);
    } else {
      console.log(`Updated`, user);
    }
    navigate("/home");
  };

  const changeHandler = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="login-container">
      <h1>{pathname === "/my-profile" ? "My Profile" : "Login"}</h1>
      <input
        type="text"
        placeholder="UserID"
        value={user?.name}
        name="name"
        className="input"
        onChange={changeHandler}
      />
      <input
        type="password"
        placeholder="Password"
        value={user?.password}
        name="password"
        className="input"
        onChange={changeHandler}
      />
      {pathname === "/my-profile" && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={user?.password}
          name="confirmPassword"
          className="input"
          onChange={changeHandler}
        />
      )}
      <div className="login-button-container">
        <button onClick={submitHandler} className="login-button">
          {pathname === "/my-profile" ? "Update" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
