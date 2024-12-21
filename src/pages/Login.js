import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Link,
  Box,
} from "@mui/material";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const validateInputs = () => {
    let isValid = true;
    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    } else if (username.length < 4 || username.length > 20) {
      setUsernameError("Username must be between 4 and 20 characters");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await login({ 
        username, 
        password, 
        latitude: location.latitude, 
        longitude: location.longitude 
      });
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2196f3, #21cbf3)",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          padding: "2rem",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ marginBottom: "1.5rem", color: "#2196f3", fontWeight: "bold" }}
        >
          Welcome Back!
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "2rem", color: "textSecondary" }}
        >
          Login to access your weather insights.
        </Typography>
        <form onSubmit={handleLogin}>
          <Box sx={{ marginBottom: "1.5rem" }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={Boolean(usernameError)}
              helperText={usernameError}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </Box>
          <Box sx={{ marginBottom: "2rem" }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(passwordError)}
              helperText={passwordError}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </Box>
          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ marginBottom: "1rem" }}
            >
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              padding: "0.75rem",
              borderRadius: "8px",
              fontWeight: "bold",
              textTransform: "none",
              background: "linear-gradient(90deg, #2196f3, #21cbf3)",
              "&:hover": {
                background: "linear-gradient(90deg, #21cbf3, #2196f3)",
              },
            }}
          >
            Login
          </Button>
        </form>
        <Box sx={{ marginTop: "1.5rem" }}>
          <Typography variant="body2" color="textSecondary">
            Don't have an account?{" "}
            <Link
              href="/signup"
              sx={{
                color: "#2196f3",
                fontWeight: "bold",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
