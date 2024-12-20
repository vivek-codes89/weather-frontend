import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TextField,
} from "@mui/material";
import { fetchLogs } from "../services/api";

// Enhance the styling of the table and individual elements
const styles = {
  paper: {
    padding: "20px",
    marginTop: "20px",
    backgroundColor: "#f0f7ff",
    borderRadius: "10px",
  },
  tableContainer: {
    marginTop: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  headerCell: {
    backgroundColor: "#1976d2",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
  },
  tableCell: {
    fontSize: "14px",
    padding: "10px",
  },
  locationText: {
    fontStyle: "italic",
    color: "#555",
  },
  title: {
    color: "#1976d2",
    fontWeight: "bold",
  },
};

const LogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserLogs = async () => {
      try {
        const response = await fetchLogs();
        setLogs(response.data.logs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserLogs();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredLogs = logs.filter((log) =>
    log.log_query.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper style={styles.paper}>
      <Typography variant="h4" style={styles.title}>
        Weather Log Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={styles.tableContainer}>
            <Typography variant="h6" style={styles.title}>
              User Access Logs
            </Typography>

            <TextField
              label="Search Query"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
              value={searchQuery}
              onChange={handleSearchChange}
            />

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={styles.headerCell}>Log ID</TableCell>
                    <TableCell style={styles.headerCell}>Query</TableCell>
                    <TableCell style={styles.headerCell}>Timestamp</TableCell>
                    {/* Commented out the Location column */}
                    {/* <TableCell style={styles.headerCell}>Location</TableCell> */}
                    <TableCell style={styles.headerCell}>User Name</TableCell>
                    <TableCell style={styles.headerCell}>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <TableRow key={log.log_id}>
                        <TableCell style={styles.tableCell}>
                          {log.log_id}
                        </TableCell>
                        <TableCell style={styles.tableCell}>
                          {log.log_query || "Invalid Query"}
                        </TableCell>
                        <TableCell style={styles.tableCell}>
                          {new Date(log.log_timestamp).toLocaleString()}
                        </TableCell>
                        {/* Commented out the Location column */}
                        {/* <TableCell style={styles.tableCell}>
                          {log.latitude && log.longitude ? (
                            <Typography
                              variant="body2"
                              style={styles.locationText}
                            >
                              Lat: {log.latitude}, Lon: {log.longitude}
                            </Typography>
                          ) : (
                            "No location provided"
                          )}
                        </TableCell> */}
                        <TableCell style={styles.tableCell}>
                          {`${log.user_first_name} ${log.user_last_name}`}
                        </TableCell>
                        <TableCell style={styles.tableCell}>
                          {log.user_email}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} style={styles.tableCell}>
                        No logs available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LogsTable;
