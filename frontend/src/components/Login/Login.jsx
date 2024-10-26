import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

      // Assuming response.data includes the token and username
      const { token, username: loggedInUserName } = response.data; // Adjust as per your actual response structure
      localStorage.setItem("token", token);
      localStorage.setItem("username", loggedInUserName); // Store the username
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
        <input
          type="password"
          placeholder="Password"
          className="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
        />
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
