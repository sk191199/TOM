import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const ChangePassword = () => {
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
          <LockIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Change Password
          </Typography>
        </Box>

        {/* Right side buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Update Password
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </Box>
      </Box>

      {/* Form Section */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <TextField
            label="User Name"
            fullWidth
            sx={{ flex: { xs: "1 1 100%", md: "1 1 23%" } }}
          />
          <TextField
            label="Old Password"
            type="password"
            fullWidth
            sx={{ flex: { xs: "1 1 100%", md: "1 1 23%" } }}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            sx={{ flex: { xs: "1 1 100%", md: "1 1 23%" } }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            sx={{ flex: { xs: "1 1 100%", md: "1 1 23%" } }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default ChangePassword;
