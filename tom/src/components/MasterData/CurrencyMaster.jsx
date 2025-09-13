import React, { useState, useEffect } from "react";
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
  TablePagination, CircularProgress, Container
} from "@mui/material";
import { Edit, Refresh, Publish } from "@mui/icons-material";
import { getFetchCurrencyList } from "../../services/api";


const CurrencyMaster = () => {
  const [currencyList, setCurrencyList] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCurrencyData = async () => {
    try {
      setLoading(true);

      const response = await getFetchCurrencyList({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      });
      console.log(response.data);

      const currencyData = response.data.data || [];

      setCurrencyList([...currencyData]);
      setRowCount(response.data.pagenation?.total || 0);
    } catch (err) {
      console.error("Failed to fetch currency List", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCurrencyData();
  }, [paginationModel]);


  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
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
            onClick={fetchCurrencyData}
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
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" rowSpan={2}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : currencyList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                currencyList.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      backgroundColor: index % 2 === 1 ? "#fafafa" : "inherit",
                    }}
                  >
                    <TableCell>{row.currency_id}</TableCell>
                    <TableCell>{row.currency}</TableCell>
                    <TableCell>{row.exchange_rate}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={rowCount}
          page={paginationModel.page}
          onPageChange={(_, newPage) =>
            setPaginationModel((prev) => ({ ...prev, page: newPage }))
          }
          rowsPerPage={paginationModel.pageSize}
          onRowsPerPageChange={(e) =>
            setPaginationModel({ page: 0, pageSize: parseInt(e.target.value, 10) })
          }
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </Paper>
    </Container>
  );
};

export default CurrencyMaster;
