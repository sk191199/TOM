import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import { Save, Clear, Cancel, Edit } from "@mui/icons-material";

const CostCenterCreation = () => {
  const rows = [
    { code: "CC201", name: "Administration", status: true },
    { code: "CC202", name: "Sales and marketing", status: false },
    { code: "CC203", name: "Accounting", status: true },
    { code: "CC204", name: "Human resources", status: false },
    { code: "CC205", name: "IT & Support", status: true },
    { code: "CC206", name: "Operators", status: true },
    { code: "CC207", name: "Research & development", status: false },
    { code: "CC208", name: "Warehouse and logistics", status: true },
  ];

  return (
    <Box p={2}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems={{xs:"start", sm:"center"}} mb={2} flexDirection={{ xs: "column", sm: "row" }} gap={2}>
        <Typography variant="h6" fontWeight="bold">
          📘 Cost Center Creation
        </Typography>
        <Box display="flex" gap={1} alignItems="center">
          <Button variant="contained" color="error" startIcon={<Save />}>
            Save
          </Button>
          <Button variant="contained" color="info" startIcon={<Clear />}>
            Clear
          </Button>
          <Button variant="contained" color="primary" startIcon={<Cancel />}>
            Cancel
          </Button>
        </Box>
      </Box>

      {/* Form Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
          <TextField label="Code" size="small" sx={{ flex: "1 1 200px" }} />
          <TextField label="Name" size="small" sx={{ flex: "1 1 200px" }} />
          <Box display="flex" alignItems="center" gap={1}>
            <Checkbox defaultChecked />
            <Typography>Active</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Table Section */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Code</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    {row.status ? (
                      <Typography color="success.main">✔</Typography>
                    ) : (
                      <Typography color="error.main">✘</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CostCenterCreation;
