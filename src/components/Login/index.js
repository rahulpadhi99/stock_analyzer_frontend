// src/components/Login.js
import React, { useState } from "react";
import "./login.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { passwordValidator } from "../../utils/passwordValidation";

const Login = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [user, setUser] = useState({
    userID: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    userID: "",
    password: "",
    confirmPassword: "",
  });

  const submitHandler = async () => {
    const isPasswordValidated = passwordValidator(user?.password);
    if (isPasswordValidated) {
      if (pathname === "/my-profile") {
        console.log(`Updated`, user);
      } else {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/auth/login`,
            {
              userID: user?.userID,
              password: user?.password,
            }
          );
          const userID = response?.data?.userID;
          localStorage.setItem("loggedUserID", userID);
          navigate("/home");
        } catch (err) {
          setError((prev) => ({
            ...prev,
            password: err?.response?.data?.message,
          }));
        }
      }
    } else {
      setError((prev) => ({
        ...prev,
        password:
          "Please enter a valid password, A standard password must contain min 8 characters, min 1 uppercase alphabet, lowercase alphabet, numeric value and special symbol",
      }));
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
      {error && (
        <Typography
          variant="caption"
          color="red"
          textAlign="left"
          width={"100%"}
        >
          {error?.password}
        </Typography>
      )}
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
