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
  Select,
  MenuItem,
  useMediaQuery
} from "@mui/material";
import { Save, Clear, Cancel, Edit, Delete } from "@mui/icons-material";


const ProjectMaster = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
  const rows = [
    { code: "PT001", name: "Company neme1", start: "03 - 05 - 2024", end: "03 - 05 - 2028", status: true },
    { code: "PT002", name: "Company neme2", start: "01 - 08 - 2023", end: "03 - 05 - 2030", status: false },
    { code: "PT003", name: "Company neme3", start: "08 - 09 - 2025", end: "03 - 05 - 2028", status: true },
    { code: "PT004", name: "Company neme4", start: "05 - 02 - 2021", end: "03 - 05 - 2031", status: false },
    { code: "PT005", name: "Company neme5", start: "06 - 09 - 2019", end: "03 - 05 - 2021", status: true },
  ];

  return (
    <Box p={2}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems={isMobile ? "start" : "center"} mb={2} flexDirection={isMobile ? "column" : "row"} gap={2}>
        <Typography variant="h6" fontWeight="bold">
          📂 Project Master
        </Typography>
        <Box display="flex" gap={1}>
          <Button variant="contained" color="error" startIcon={<Save />}>Save</Button>
          <Button variant="outlined"  startIcon={<Clear />}>Clear</Button>
          <Button variant="contained" color="primary" startIcon={<Cancel />}>Cancel</Button>
        </Box>
      </Box>

      {/* Form Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <TextField label="Project Code" size="small" sx={{ flex: "1 1 200px" }} />
          <TextField label="Project Name" size="small" sx={{ flex: "1 1 200px" }} />
          <Select displayEmpty defaultValue="" size="small" sx={{ flex: "1 1 200px" }}>
            <MenuItem value="">Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
          <TextField type="date" size="small" sx={{ flex: "1 1 200px" }} />
          <TextField type="date" size="small" sx={{ flex: "1 1 200px" }} />
        </Box>

        <Box mt={2}>
          <TextField
            label="Project Description"
            multiline
            rows={3}
            fullWidth
            size="small"
          />
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
                <TableCell><b>Start Date</b></TableCell>
                <TableCell><b>End Date</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.start}</TableCell>
                  <TableCell>{row.end}</TableCell>
                  <TableCell>
                    {row.status ? (
                      <Typography color="success.main">✔</Typography>
                    ) : (
                      <Typography color="error.main">✘</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary"><Edit /></IconButton>
                    <IconButton color="error"><Delete /></IconButton>
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

export default ProjectMaster;
