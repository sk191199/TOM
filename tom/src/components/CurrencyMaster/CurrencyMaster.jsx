import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  TablePagination,
} from "@mui/material";
import { Edit, Refresh, Publish } from "@mui/icons-material";

const CurrencyMaster = () => {
  const rows = [
    { id: 1, currency: "AED", rate: 4.2864788 },
    { id: 2, currency: "AFN", rate: 79.577446 },
    { id: 3, currency: "AMD", rate: 447.96788 },
    { id: 4, currency: "SDA", rate: 34.675888 },
    { id: 5, currency: "TGA", rate: 34.675888 },
    { id: 6, currency: "AED", rate: 4.2864788 },
    { id: 7, currency: "AFN", rate: 79.577446 },
    { id: 8, currency: "AMD", rate: 447.96788 },
    { id: 9, currency: "SDA", rate: 34.675888 },
    { id: 10, currency: "TGA", rate: 34.675888 },
    { id: 11, currency: "USD", rate: 1.234567 },
    { id: 12, currency: "INR", rate: 82.45678 },
    { id: 13, currency: "GBP", rate: 0.87654 },
    { id: 14, currency: "EUR", rate: 0.93456 },
    { id: 15, currency: "JPY", rate: 123.4567 },
    { id: 16, currency: "CNY", rate: 6.54321 },
    { id: 17, currency: "AUD", rate: 1.34567 },
    { id: 18, currency: "CAD", rate: 1.23456 },
    { id: 19, currency: "SGD", rate: 1.56789 },
    { id: 20, currency: "NZD", rate: 1.67890 },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        // padding={2}
      >
        <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2329/2329087.png"
            alt="icon"
            width={20}
          />
          Currency Master
        </Typography>

        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="error"
            startIcon={<Publish />}
          >
            Post Rates
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Refresh />}
          >
            Refresh Rates
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <Paper>
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Currency</b></TableCell>
                <TableCell><b>Exchange Rate</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.currency}</TableCell>
                    <TableCell>{row.rate}</TableCell>
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

        {/* Pagination */}
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Paper>
    </Box>
  );
};

export default CurrencyMaster;
