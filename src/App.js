import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import LogsTable from "./components/LogsTable";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setIsLoggedIn(false); // Update login state
  };

  return (
    <Router>
      <Routes>
        {/* Default Route: Login, only show if not logged in */}
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* Signup Route, only show if not logged in */}
        <Route
          path="/signup"
          element={!isLoggedIn ? <Signup /> : <Navigate to="/dashboard" />}
        />

        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route path="/logs" element={<LogsTable />} />
      </Routes>
    </Router>
  );
};

export default App;
