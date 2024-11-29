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
      <Paper
        elevation={6}
        sx={{
          padding: "2rem",
          width: "100%",
          maxWidth: 400,
          backgroundColor: "rgba(255, 250, 157, 0.9)",
          borderRadius: "20px",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          mb={2}
          fontFamily="Helvetica"
        >
          Sign Up
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
            sx={{
              backgroundColor: "white",
              width: "90%",
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
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              width: "90%",
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
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              width: "90%",
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
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              width: "90%",
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
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              backgroundColor: "#e29d3f",
              "&:hover": {
                backgroundColor: "#C37A2C",
              },
              width: "90%",
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
          <Typography variant="body2">
            Already have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/")}
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </Paper>

      {/* Snackbar for password mismatch */}
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
