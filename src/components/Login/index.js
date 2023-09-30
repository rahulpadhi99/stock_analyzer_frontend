// src/components/Login.js
import React, { useState } from "react";
import "./login.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [user, setUser] = useState({
    userID: "",
    password: "",
    confirmPassword: "",
  });

  const submitHandler = async () => {
    if (pathname === "/my-profile") {
      console.log(`Updated`, user);
    } else {
      const response = await axios.post("http://localhost:8000/auth/login", {
        userID: user?.userID,
        password: user?.password,
      });
      const userID = response?.data?.userID;
      localStorage.setItem("loggedUserID", userID);
      navigate("/home");
    }
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
        name="userID"
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
