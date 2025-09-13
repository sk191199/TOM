import React, { useState, useEffect } from 'react';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormProvider, RHFCheckbox, RHFTextField } from "../hook-form";
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
  Checkbox, Stack, CircularProgress, TablePagination, Grid, Container
} from "@mui/material";
import { Edit, Save, Clear, Check, Close } from "@mui/icons-material";
import { createCostCenter, updateCostCenter, getFetchCostCenterList } from "../../services/api";


const CostCenterCreation = () => {
  const [itemsList, setItemsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);
  const [editId, setEditId] = useState(null);

  const schema = Yup.object().shape({
    code: Yup.string().required("Codee is required"),
    name: Yup.string().required("Name is required"),
    status: Yup.boolean(),
  });

  const defaultValues = {
    code: "",
    name: "",
    status: true,
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const fetchItemsData = async () => {
    try {
      setLoading(true);

      const response = await getFetchCostCenterList({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      });
      console.log(response.data);

      const itemsData = response.data.data || [];

      setItemsList([...itemsData]);
      setRowCount(response.data.pagenation?.total || 0);
    } catch (err) {
      console.error("Failed to fetch cost center List", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchItemsData();
  }, [paginationModel]);

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      let response;

      if (editId) {
        response = await updateCostCenter(editId, data);
      } else {
        response = await createCostCenter(data);
      }

      console.log(response.data);

      if (response.data.success === true) {
        alert(editId ? "Cost center updated successfully!" : "Cost center created successfully!");

        onClearClick();
        fetchItemsData();
      } else {
        alert(response.data?.message ?? "Failed to create Cost center");
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
      code: row.code,
      name: row.name,
      status: row.status == true,
    });

    setEditId(row.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, }}>
      {/* Header */}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="space-between" alignItems={{ xs: "start", sm: "center" }} mb={2} flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          <Typography variant="h6" fontWeight="bold">
            📘 Cost Center Creation
          </Typography>
          <Box display="flex" gap={1} alignItems="center">
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
          </Box>
        </Box>


        {/* Form Section */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Stack direction="row" spacing={2}>
            <RHFTextField name="code" label="Code*" disabled={editId != null} sx={{ width: 300 }} />

            <RHFTextField name="name" label="Name*" sx={{ width: 300 }} />

            <RHFCheckbox name="status" label="Active" sx={{ width: 300 }} />
          </Stack>
        </Paper>
      </FormProvider>

      {/* Table Section */}
      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><b>Code</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center" rowSpan={2}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : itemsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              itemsList.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: index % 2 === 1 ? "#fafafa" : "inherit",
                  }}
                >
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.status == true ? <Check color="success" /> : <Close color="error" />}</TableCell>
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

export default CostCenterCreation;
