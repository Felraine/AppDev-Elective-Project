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
  const [showPassword, setShowPassword] = useState(false);
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
      const errorMsg =
        error.response?.data || "Login failed. Please check your credentials.";
      setErrorMessage(errorMsg);
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
        backgroundColor: "#E29D3F",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      
      <Paper
  elevation={6}
  sx={{
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    maxWidth: 800,
    maxHeight: 500,
    borderRadius: "20px",
    position: "relative",
  }}
>
  {/* Left Section */}
  <Box
    sx={{
      flex: 1,
      padding: "2rem",
      backgroundColor: "rgba(255, 250, 157, 0.9)",
      borderTopLeftRadius: "20px",
      borderBottomLeftRadius: "20px",
    }}
  >
    <Typography variant="h5" textAlign="left" mb={0} fontFamily="Helvetica " fontWeight="bold" marginLeft="20px">
      Hello,
    </Typography>
    <Typography variant="h5" textAlign="left" mb={3} fontFamily="Helvetica " fontWeight="bold" marginLeft="20px">
      Welcome back
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
          borderRadius: "20px",
          marginTop: "10px",
          marginLeft:"20px",
          width: "300px",
          height: "55px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none", 
            },
            "&:hover fieldset": {
              border: "none", 
            },
            "&.Mui-focused fieldset": {
              border: "none", 
            },
          },
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
          borderRadius: "20px",
          marginTop: "10px",
          marginLeft:"20px",
          width: "300px",
          height: "55px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none", 
            },
            "&:hover fieldset": {
              border: "none", 
            },
            "&.Mui-focused fieldset": {
              border: "none", 
            },
          },
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
        sx={{
          textTransform: "none",
          fontSize:"18px",
          fontWeight:"bold",
          backgroundColor: "#e29d3f",
          padding: "10px",
          marginTop: "10px",
          marginLeft:"20px",
          width: "300px",
          height: "40px",
          "&:hover": {
            backgroundColor: "#C37A2C",
          },
          borderRadius: "20px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none", 
            },
            "&:hover fieldset": {
              border: "none", 
            },
            "&.Mui-focused fieldset": {
              border: "none", 
            },
          },
          marginTop: "20px",
        }}
      >
        Login
      </Button>
    </form>
    <Box textAlign="center" mt={2}>
      <Typography marginRight="30px" marginTop="65px">
        Don&apos;t have an account?{" "}
        <Link
          onClick={() => navigate("/signup")}
          sx={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Sign up
        </Link>
      </Typography>
    </Box>
  </Box>

  {/* Right Section */}
  <Box
    sx={{
      flex: 1,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderTopRightRadius: "20px",
      borderBottomRightRadius: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      
    }}
  >
    <Box
      sx={{
        width: "80%",
        height: "80%",
        borderRadius: "10px",
        backgroundImage: `url('src/assets/images/loginImage.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginBottom:"55px",
      }}
    >
      <Typography
        variant="body1"
        textAlign="center"
        color="text.secondary"
        sx={{ lineHeight: "200px",
        zIndex: 1, //text appears above the image
        position: "relative",
        color: "#514538",
        position: "absolute",
        bottom: 0, 
        marginLeft: "40px",
        marginBottom: "-50px",
        fontWeight: "bold",
         }}
      >
       Where Tasks Meet Simplicity.
      </Typography>
      
    </Box>
  </Box>
</Paper>

    </Box>
  );
};

export default Login;
