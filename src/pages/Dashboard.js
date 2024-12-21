import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Paper,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchWeather, fetchUserDetails } from "../services/api";
import { WiHumidity, WiWindy, WiThermometer } from "react-icons/wi";
import { GiThermometerCold } from "react-icons/gi";

const Dashboard = ({ onLogout }) => {
  const [weather, setWeather] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Function to get the user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation: ", error);
          setLatitude(0);
          setLongitude(0);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  useEffect(() => {
    getUserLocation();

    const fetchUserData = async () => {
      try {
        const response = await fetchUserDetails();
        setUserDetails(response.data);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (latitude && longitude) {
        try {
          const response = await fetchWeather(latitude, longitude);
          setWeather(response.data);
        } catch (err) {
          alert("Error fetching weather: " + err.message);
        }
      }
    };

    if (latitude && longitude) {
      fetchWeatherData();
    }
  }, [latitude, longitude]);

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "yellow",
        backgroundSize: "cover",
      }}
    >
      {/* Top Section with Avatar */}
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        {userDetails && (
          <Avatar
            sx={{
              width: 60,
              height: 60,
              backgroundColor: "#1976d2",
              cursor: "pointer",
              fontSize: "24px",
              fontWeight: "bold",
              letterSpacing: 1,
            }}
            onClick={handleClick}
          >
            {userDetails.first_name?.charAt(0)}
          </Avatar>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            elevation: 5,
            sx: {
              width: 200,
              borderRadius: 2,
              padding: 1,
              boxShadow: "0px 0px 12px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Box sx={{ padding: 1 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginBottom: 1 }}
            >
              {userDetails?.email}
            </Typography>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Box>
        </Menu>
      </Box>

      {/* Weather Section */}
      <Grid
        container
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          zIndex: 1, // Ensure weather section is on top of the background
        }}
      >
        {weather && (
          <Grid
            item
            xs={12}
            sm={10}
            md={8}
            lg={6}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: 4,
              boxShadow: 6,
              padding: 4,
              textAlign: "center",
              overflow: "hidden",
              backdropFilter: "blur(10px)", // To give a glass-like effect on the background
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "#1976d2", marginBottom: 2 }}
            >
              {weather.location.name}, {weather.location.country}
            </Typography>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                image={weather.current.weather_icons[0]}
                alt={weather.current.weather_descriptions[0]}
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  marginBottom: 2,
                  boxShadow: "0px 0px 8px rgba(0,0,0,0.1)",
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: "#1565c0", fontWeight: 600 }}
                >
                  {weather.current.weather_descriptions[0]}
                </Typography>
                <Typography variant="h5" sx={{ margin: 2, fontWeight: 600 }}>
                  {weather.current.temperature}°C
                </Typography>

                {/* Weather Details with Icons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <WiThermometer size={28} color="#1565c0" />
                    <Typography
                      variant="body1"
                      sx={{ marginLeft: 1, fontSize: "16px" }}
                    >
                      Feels Like: {weather.current.feelslike}°C
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <WiHumidity size={28} color="#1565c0" />
                    <Typography
                      variant="body1"
                      sx={{ marginLeft: 1, fontSize: "16px" }}
                    >
                      Humidity: {weather.current.humidity}%
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <WiWindy size={28} color="#1565c0" />
                    <Typography
                      variant="body1"
                      sx={{ marginLeft: 1, fontSize: "16px" }}
                    >
                      Wind Speed: {weather.current.wind_speed} km/h
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;
