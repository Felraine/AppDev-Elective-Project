import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Link,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { username, password };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        payload
      );
      const { token, username: loggedInUserName, userId } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", loggedInUserName);
      localStorage.setItem("userId", userId);
      onLogin(response.data);
      navigate("/home");
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("./src/assets/images/loginBackground.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: "2rem",
          width: "100%",
          maxWidth: 450,
          backgroundColor: "rgba(255, 250, 157, 0.9)",
          borderRadius: "20px",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          mb={2}
          fontFamily="monospace"
        >
          Login
        </Typography>
        {errorMessage && (
          <Typography color="error" mb={2} textAlign="center">
            {errorMessage}
          </Typography>
        )}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ textTransform: "none", backgroundColor: "#e29d3f" }}
          >
            Login
          </Button>
        </form>
        <Box textAlign="center" mt={2}>
          <Typography>
            Don&apos;t have an account?{" "}
            <Link
              onClick={() => navigate("/signup")}
              sx={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
