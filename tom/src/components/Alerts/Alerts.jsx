import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const rows = [
  { type: "SMS", department: "Sales", designation: "Manager", date: "03/06/2025", time: "12:40:21" },
  { type: "Email", department: "Accounts", designation: "Accountant", date: "23/09/2025", time: "17:35:15" },
  { type: "SMS", department: "Sales", designation: "Manager", date: "03/06/2025", time: "12:40:21" },
  { type: "Email", department: "Accounts", designation: "Accountant", date: "23/09/2025", time: "17:35:15" },
  { type: "SMS", department: "Sales", designation: "Manager", date: "03/06/2025", time: "12:40:21" },
];

const Alerts = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap", // responsive for mobile
          mb: 3,
        }}
      >
        {/* Left side */}
        <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 0 } }}>
          <NotificationsIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Notification & Alerts Management
          </Typography>
        </Box>

        {/* Right side buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" color="info">
            Clear
          </Button>
          <Button variant="contained" color="error">
            Cancel
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f8f9fb" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Designation</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.designation}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Alerts;
