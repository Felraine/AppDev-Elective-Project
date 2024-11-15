import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        payload
      );
      console.log("Login successful:", response.data);

      const { token, username: loggedInUserName, userId } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", loggedInUserName);
      localStorage.setItem("userId", userId);
      onLogin(response.data);
      navigate("/home");
    } catch (error) {
      console.error(
        "Error logging in:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          aria-label="Username"
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
          {password && (
            <span onClick={togglePasswordVisibility} className="password-icon">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </span>
          )}
        </div>

        <button type="submit" className="login">
          Login
        </button>
      </form>
      <div className="signup">
        <span>Don't have an account? </span>
        <a onClick={() => navigate("/signup")}>Sign up</a>
      </div>
    </div>
  );
};

export default Login;
