// src/components/Login.js
import React, { useState } from "react";
import "./login.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

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
    <Box className="login-container">
      <Typography variant="h2">
        {pathname === "/my-profile" ? "My Profile" : "Login"}
      </Typography>
      <TextField
        type="text"
        placeholder="UserID"
        value={user?.name}
        name="name"
        className="input"
        onChange={changeHandler}
      />
      <TextField
        type="password"
        placeholder="Password"
        value={user?.password}
        name="password"
        className="input"
        onChange={changeHandler}
      />
      {pathname === "/my-profile" && (
        <TextField
          type="password"
          placeholder="Confirm Password"
          value={user?.password}
          name="confirmPassword"
          className="input"
          onChange={changeHandler}
        />
      )}
      <Box className="login-button-container">
        <Button onClick={submitHandler} className="button">
          {pathname === "/my-profile" ? "Update" : "Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
