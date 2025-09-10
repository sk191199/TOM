import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
} from "@mui/material";
import { Edit, Save, Clear, Cancel } from "@mui/icons-material";

const UomMaster = () => {
  const rows = [
    { id: 1, name: "Piece" },
    { id: 2, name: "Box" },
    { id: 3, name: "Kg" },
    { id: 4, name: "Meter" },
    { id: 5, name: "Litre" },
    { id: 6, name: "Packet" },
    { id: 7, name: "Can" },
    { id: 8, name: "Roll" },
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
        <Typography
          variant="h6"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
            alt="icon"
            width={20}
          />
          UOM Master
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
            color="info"
            startIcon={<Cancel />}
          >
            Cancel
          </Button>
        </Box>
      </Box>

      {/* Form */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          alignItems="center"
        >
          <TextField
            label="UOM Name"
            variant="outlined"
            size="small"
            sx={{ flex: "1 1 250px" }}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked color="primary" />}
            label="Active"
          />
        </Box>
      </Paper>

      {/* Table */}
      <Paper>
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>UOM Name</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <IconButton color="secondary">
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
};

export default UomMaster;
