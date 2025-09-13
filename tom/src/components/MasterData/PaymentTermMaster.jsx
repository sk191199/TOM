import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "../hook-form";
import { Box, Button, TextField, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, TablePagination, CircularProgress, Stack, Container } from "@mui/material";
import { Save, Clear, Cancel, Edit } from "@mui/icons-material";
import { createPaymentTerms, updatePaymentTerms, getFetchPaymentTerms } from "../../services/api";

const PaymentTermMaster = () => {
  const [ptmList, setPtmList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);
  const [editId, setEditId] = useState(null);

  const schema = Yup.object().shape({
    pt_term_name: Yup.string().required("Term name is required"),
    number_of_days: Yup.number()
      .typeError("No of days must be a number")
      .required("No of days is required")
      .positive("No of days must be positive")
      .integer("No of days must be an integer"),
  });

  const defaultValues = {
    pt_term_name: "",
    number_of_days: "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const fetchptmData = async () => {
    try {
      setLoading(true);

      const response = await getFetchPaymentTerms({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      });
      console.log(response.data);

      const ptmData = response.data.data || [];

      setPtmList([...ptmData]);
      setRowCount(response.data.pagenation?.total || 0);
    } catch (err) {
      console.error("Failed to fetch payment terms List", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchptmData();
  }, [paginationModel]);

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      let response;

      if (editId) {
        response = await updatePaymentTerms(editId, data);
      } else {
        response = await createPaymentTerms(data);
      }

      console.log(response.data);

      if (response.data.success === true) {


        alert(editId ? "Payment term updated successfully!" : "Payment term created successfully!");

        onClearClick();
        fetchptmData();
      } else {
        alert(response.data?.message ?? "Failed to create payment term");
      }
    } catch (err) {
      console.error("Error creating account:", err);
      alert(err.response.data?.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const onClearClick = () => {
    reset(defaultValues);
    setEditId(null);
  }

  const onHandleEdit = (row) => {
    reset({
      pt_term_name: row.pt_term_name,
      number_of_days: row.number_of_days,
    });

    setEditId(row.pt_code);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header */}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

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
              type="submit"
              variant="contained"
              color="error"
              disabled={submitting}
              startIcon={<Save />}
            >
              {editId ? "Update" : "Submit"}
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
        <Paper sx={{ p: 3, mb: 3 }}>
          <Stack direction="row" spacing={2}>
            <RHFTextField name="pt_term_name" label="Term Name*" placeholder="Enter term name" sx={{ width: 300 }} />

            <RHFTextField name="number_of_days" label="Number of Days*" placeholder="Enter no of days" sx={{ width: 300 }} />
          </Stack>
        </Paper>
      </FormProvider>
      {/* Table */}
      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Code</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Days</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
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
                    backgroundColor: index % 2 === 1 ? "#fafafa" : "inherit",
                  }}
                >
                  <TableCell>{row.pt_code}</TableCell>
                  <TableCell>{row.pt_term_name}</TableCell>
                  <TableCell>{row.number_of_days}</TableCell>
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
    </Container>
  );
};

export default PaymentTermMaster;
