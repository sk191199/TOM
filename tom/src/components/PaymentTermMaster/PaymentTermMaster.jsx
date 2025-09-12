import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, TablePagination, CircularProgress, } from "@mui/material";
import { Save, Clear, Cancel, Edit } from "@mui/icons-material";
import { createPaymentTerms, getFetchPaymentTerms } from "../../services/api";

const PaymentTermMaster = () => {
  const [ptmList, setptmList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);
  const [termName, settermName] = useState("");
  const [days, setdays] = useState("");

  const fetchptmData = async () => {
  try {
    setLoading(true);
    const response = await getFetchPaymentTerms();
    console.log(response.data);

    const ptmData = response.data.data || [];

    // Client-side pagination
    const startIndex = paginationModel.page * paginationModel.pageSize;
    const endIndex = startIndex + paginationModel.pageSize;

    setptmList(ptmData.slice(startIndex, endIndex));
    setRowCount(ptmData.length); // total count for TablePagination
  } catch (err) {
    console.error("Failed to fetch payment terms List", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchptmData();
  }, [paginationModel]);

  const onHandleCreateptmClick = async () => {
    // checkings
    const payloadData = {
      pt_term_name: termName,
      number_of_days: Number(days),
    }
    try {
      const response = await createPaymentTerms(payloadData);
      console.log(response.data);

      if (response.data.success === true) {
        fetchptmData();
      }
    } catch (err) {
      console.error("Error creating account:", err);
    } finally {
      setLoading(false);
    }
  }

  const onClearClick = () => {
    settermName("");
    setdays("");
  }

  const onHandleEdit = (row) => {
    settermName(row.pt_term_name);
    setdays(row.number_of_days);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box p={2} sx={{ minHeight: "calc( 100vh - 56px)" }}>
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
            onClick={() => onHandleCreateptmClick()}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Clear />}
            onClick={() => onClearClick()}
          >
            Clear
          </Button>
          {/* <Button
            variant="contained"
            color="primary"
            startIcon={<Cancel />}
          >
            Cancel
          </Button> */}
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
          <TextField label="Payment Term Name" variant="outlined"
            value={termName}
            onChange={(e) => settermName(e.target.value)}
            sx={{ flex: "1 1 250px" }} />
          <TextField label="Number of Days" variant="outlined"
            onKeyDown={(e) => { if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();}}
            value={days}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setdays(val);
            }}
            sx={{ flex: "1 1 250px" }} />
        </Box>
      </Paper>

      {/* Table */}
      <Paper sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Code</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Days</TableCell>
              <TableCell sx={{ fontWeight: "bold",textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center" rowSpan={2}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : ptmList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              ptmList.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: index % 2 === 1 ? "#fafafa" : "inherit", // alternate rows
                  }}
                >
                  <TableCell>{row.pt_code}</TableCell>
                  <TableCell>{row.pt_term_name}</TableCell>
                  <TableCell>{row.number_of_days === false ? "1": row.number_of_days}</TableCell>
                  <TableCell sx={{ textAlign: "center" }} >
                    <IconButton
                      color="primary"
                      onClick={() => onHandleEdit(row)}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
    </Box>
  );
};

export default PaymentTermMaster;
