import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  MenuItem,
  Paper,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const AccountCreation = () => {
  const [showForm, setShowForm] = useState(false);

  // Dummy data
  const accounts = [
    { id: 1, code: "Ac-345556", name: "Name 1", status: true },
    { id: 2, code: "Ac-345556", name: "Name 2", status: true },
    { id: 3, code: "Ac-345556", name: "Name 3", status: true },
    { id: 4, code: "Ac-345556", name: "Name 4", status: true },
    { id: 5, code: "Ac-345556", name: "Name 5", status: true },
  ];

  return (
    <div style={{ backgroundColor: "#f5f8fc", minHeight: "100vh", padding: "16px" }}>
      {/* ===================== LIST VIEW ===================== */}
      {!showForm ? (
        <>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              📘 Accounts List
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowForm(true)}
              >
                New
              </Button>
              <Button variant="contained" color="error">
                Export Selected
              </Button>
            </Box>
          </Box>

          {/* Table */}
          <Paper sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox /> Select All
                  </TableCell>
                  <TableCell>Doc Entry</TableCell>
                  <TableCell>Account Code</TableCell>
                  <TableCell>Account Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts.map((acc) => (
                  <TableRow key={acc.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{acc.id}</TableCell>
                    <TableCell>{acc.code}</TableCell>
                    <TableCell>{acc.name}</TableCell>
                    <TableCell>
                      <Checkbox checked={acc.status} />
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </>
      ) : (
        <>
          {/* ===================== FORM VIEW ===================== */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              📘 Account Creation
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Button variant="outlined">Print</Button>
              <Button variant="outlined">Save</Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" color="error">
                Submit
              </Button>
            </Box>
          </Box>

          {/* Form */}
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                label="Account Code"
                size="small"
                sx={{ flex: "1 1 250px" }}
              />
              <TextField
                fullWidth
                label="Account Name"
                size="small"
                sx={{ flex: "1 1 250px" }}
              />
              <TextField
                fullWidth
                label="Description"
                size="small"
                sx={{ flex: "1 1 250px" }}
              />
              <TextField
                select
                fullWidth
                label="Account Type"
                size="small"
                defaultValue=""
                sx={{ flex: "1 1 250px" }}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Asset">Asset</MenuItem>
                <MenuItem value="Liability">Liability</MenuItem>
                <MenuItem value="Equity">Equity</MenuItem>
                <MenuItem value="Revenue">Revenue</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
              </TextField>
              <TextField
                select
                fullWidth
                label="Parent Account"
                size="small"
                defaultValue=""
                sx={{ flex: "1 1 250px" }}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="1000">1000 - Main</MenuItem>
                <MenuItem value="2000">2000 - Sub</MenuItem>
              </TextField>
            </Box>

            {/* Checkboxes */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                mt: 2,
                flexWrap: "wrap",
              }}
            >
              <FormControlLabel control={<Checkbox />} label="Postable" />
              <FormControlLabel control={<Checkbox />} label="Active" />
            </Box>
          </Paper>
        </>
      )}
    </div>
  );
};

export default AccountCreation;
