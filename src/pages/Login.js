import React, { useState } from "react";
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
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ username, password });
      localStorage.setItem("token", response.data.token); // Save token in localStorage
      setIsLoggedIn(true); // Update login status
      navigate("/dashboard"); // Redirect to dashboard page
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
        minHeight: "100vh", // Make the container take the full height of the screen
        backgroundColor: "#2196f3", // Set background color
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          padding: "2rem",
          backgroundColor: "#ffffff", // White background for the form
          borderRadius: "8px",
          boxShadow: 3, // Add a shadow effect for depth
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ marginBottom: "2rem", color: "#2196f3" }}
        >
          Weather App Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Box sx={{ marginBottom: "1rem" }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={Boolean(error)}
              helperText={error}
              sx={{ marginBottom: "1rem" }}
            />
          </Box>
          <Box sx={{ marginBottom: "1rem" }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(error)}
              helperText={error}
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ padding: "0.75rem", marginTop: "1rem" }}
          >
            Login
          </Button>
        </form>

        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
        >
          <Typography variant="body2" color="textSecondary">
            Don't have an account?{" "}
            <Link
              href="/signup"
              variant="body2"
              sx={{ color: "#2196f3", fontWeight: "bold" }}
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
