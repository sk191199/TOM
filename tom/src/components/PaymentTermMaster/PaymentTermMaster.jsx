import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
} from "@mui/material";
import { Save, Clear, Cancel, Edit } from "@mui/icons-material";

const PaymentTermMaster = () => {
  const rows = [
    { code: "PT001", name: "Net 30 Days", days: 30 },
    { code: "PT002", name: "Net 45 Days", days: 45 },
    { code: "PT003", name: "Immediate", days: 0 },
    { code: "PT004", name: "Net 60 Days", days: 60 },
    { code: "PT005", name: "Net 80 Days", days: 80 },
  ];

  return (
    <Box p={2}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828673.png"
            alt="icon"
            width={20}
          />
          Payment Term Master
        </Typography>

        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="error"
            startIcon={<Save />}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Clear />}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Cancel />}
          >
            Cancel
          </Button>
        </Box>
      </Box>

      {/* Form */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          justifyContent="space-between"
        >
          <TextField label="Payment Term Code" variant="outlined" sx={{ flex: "1 1 250px" }} />
          <TextField label="Payment Term Name" variant="outlined" sx={{ flex: "1 1 250px" }} />
          <TextField label="Number of Days" variant="outlined" sx={{ flex: "1 1 250px" }} />
        </Box>
      </Paper>

      {/* Table */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><b>Code</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Days</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.days}</TableCell>
                <TableCell>
                  <IconButton color="secondary">
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default PaymentTermMaster;
