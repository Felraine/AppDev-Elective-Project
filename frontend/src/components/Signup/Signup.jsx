import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setOpenSnackbar(true); // Open the snackbar if passwords don't match
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/signup",
        { username, email, password }
      );
      console.log("Signup successful:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error.response || error);
      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
     <Typography
        variant="body1"
        textAlign="center"
        color="text.secondary"
        sx={{ lineHeight: "200px",
        zIndex: 1, //text appears above the image
        color: "#514538",
        fontWeight:"bold",
        position: "absolute",
        bottom: 50,
        marginLeft: "-400px",
         }}
      >
       From To-Do to Done, the Easy Way.
      </Typography> 
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxWidth: 800,
          height: "500px",
          backgroundColor: "rgba(255, 250, 157, 0.9)",
          borderRadius: "20px",
          overflow: "hidden",
        }}
        
      >
        {/* Left Side: Image */}
        <Box
          sx={{
            width: "50%",
            backgroundImage: `url('src/assets/images/signupImage.png')`,
            backgroundColor: "white",
            backgroundSize: '380px 380px',
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "10px 40px",
          }}
        />

        {/* Right Side: Form */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            mb={2}
            fontFamily="Helvetica"
            fontSize="20px"
            fontWeight="bold"
            marginTop="-15px"
          >
            Create a new account
          </Typography>
          {error && (
            <Typography color="error" mb={2} textAlign="center">
              {error}
            </Typography>
          )}
          <form
            onSubmit={handleSignup}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{ backgroundColor: "white", borderRadius: "20px",
              width: "80%",
              height: "50%",
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
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ backgroundColor: "white", borderRadius: "20px",
              width: "80%",
              height: "80%",
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
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ backgroundColor: "white", borderRadius: "20px",
              width: "80%",
              height: "80%",
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
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              sx={{ backgroundColor: "white", borderRadius: "20px",
                width: "80%",
                height: "80%",
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                backgroundColor: "#e29d3f",
                "&:hover": { backgroundColor: "#C37A2C" },
                width: "80%",
                height: "80%",
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
              }}
            >
              Sign Up
            </Button>
          </form>
          <Box mt={2} textAlign="center">
            <Typography variant="body2" marginTop="20px">
              Already have an account?{" "}
              <Link
                component="button"
                onClick={() => navigate("/")}
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Passwords do not match!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Signup;
