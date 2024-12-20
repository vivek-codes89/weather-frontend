// Dashboard.js
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchWeather } from "../services/api";

const Dashboard = ({ onLogout }) => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Clear token and update login state
    navigate("/"); // Navigate to login page
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a valid city name.");
      return;
    }
    try {
      const response = await fetchWeather(`city=${query}`);
      setWeather(response.data);
    } catch (err) {
      alert("Error fetching weather: " + err.message);
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Weather Dashboard
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Search City"
              variant="outlined"
              size="small"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ minWidth: "300px" }}
            />
            <Button
              variant="contained"
              size="medium"
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
          <Button
            variant="outlined"
            color="error"
            size="medium"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Paper>

      {weather && (
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            mb: 4,
            backgroundColor: "#e3f2fd",
          }}
        >
          <CardMedia
            component="img"
            image={weather.current.weather_icons[0]}
            alt={weather.current.weather_descriptions[0]}
            sx={{
              width: 128,
              height: 128,
              borderRadius: "50%",
              marginRight: 2,
              border: "2px solid #1976d2",
            }}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "#1565c0", mb: 1 }}
            >
              {weather.location.name}, {weather.location.country}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              {weather.request.query} | Local Time: {weather.location.localtime}
            </Typography>
            <Divider/>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1">
                  <strong>Weather:</strong>{" "}
                  {weather.current.weather_descriptions[0]}
                </Typography>
                <Typography variant="body1">
                  <strong>Temperature:</strong> {weather.current.temperature}°C
                </Typography>
                <Typography variant="body1">
                  <strong>Feels Like:</strong> {weather.current.feelslike}°C
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1">
                  <strong>Humidity:</strong> {weather.current.humidity}%
                </Typography>
                <Typography variant="body1">
                  <strong>Pressure:</strong> {weather.current.pressure} hPa
                </Typography>
                <Typography variant="body1">
                  <strong>Wind Speed:</strong> {weather.current.wind_speed} km/h
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1">
                  <strong>Wind Direction:</strong> {weather.current.wind_dir}
                </Typography>
                <Typography variant="body1">
                  <strong>Visibility:</strong> {weather.current.visibility} km
                </Typography>
                <Typography variant="body1">
                  <strong>UV Index:</strong> {weather.current.uv_index}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          size="medium"
          onClick={() => navigate("/logs")}
        >
          View Logs
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
