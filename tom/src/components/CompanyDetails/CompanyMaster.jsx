import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const rows = [
  { name: "Infocom IT Solutions", uen: "20151235466", gst: "Test12345", type: "Pte LTD", city: "Singapore", phone: "7854567452" },
  { name: "Tech Fabricators", uen: "20151235468", gst: "Test12348", type: "Pte LTD", city: "Singapore", phone: "8854567452" },
  { name: "Infocom IT Solutions", uen: "20151235466", gst: "Test12345", type: "Pte LTD", city: "Singapore", phone: "9854567452" },
  { name: "Infocom IT Solutions", uen: "20151235466", gst: "Test12345", type: "Pte LTD", city: "Singapore", phone: "6754567452" },
];

const CompanyMaster = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
      
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        {/* Left side */}
        <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 0 } }}>
          <BusinessIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Company Master
          </Typography>
        </Box>

        {/* Right side buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" color="error" startIcon={<SaveIcon />}>
            Save
          </Button>
          <Button variant="outlined" color="info" startIcon={<ClearIcon />}>
            Clear
          </Button>
          <Button variant="contained" color="primary" startIcon={<CancelIcon />}>
            Cancel
          </Button>
        </Box>
      </Box>

      {/* Form Section */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <TextField label="Company Name" fullWidth sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="UEN (Unique Entity Number)" fullWidth sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="GST Registration Number" fullWidth sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />

          <TextField
            label="Company Type"
            select
            fullWidth
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }}
          >
            <MenuItem value="Pte LTD">Pte LTD</MenuItem>
            <MenuItem value="LLP">LLP</MenuItem>
          </TextField>

          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }}
          >
            Company Logo
            <input type="file" hidden />
          </Button>

          <TextField
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }}
          />
          <TextField label="Street Address" fullWidth sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="Building / Unit Number" fullWidth sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="City" fullWidth sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="Postal Code" fullWidth sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="Country" fullWidth sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="Email" type="email" fullWidth sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="Website (Optional)" fullWidth sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
        </Box>
      </Paper>

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f8f9fb" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>UEN</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>GST No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.uen}</TableCell>
                <TableCell>{row.gst}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CompanyMaster;
