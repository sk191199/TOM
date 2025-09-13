import React, { useState, useEffect } from 'react';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormProvider, RHFCheckbox, RHFTextField } from "../hook-form";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography, Paper, Stack, CircularProgress, TablePagination
} from '@mui/material';
import { Edit, Save, Clear, Check, Close } from "@mui/icons-material";
import { createFinYear, updateFinYear, getFetchFinYearList } from "../../services/api";


const FinancialYearMaster = () => {
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
    year_code: Yup.string().required("Year code is required"),
    start_date: Yup.string().required("Start date is required"),
    end_date: Yup.string().required("End date is required")
      .test("is-after-start", "End date must be after start date", function (value) {
        const { start_date } = this.parent;
        return !start_date || !value || new Date(value) >= new Date(start_date);
      }),
    status: Yup.boolean(),
  });

  const defaultValues = {
    year_code: "",
    start_date: "",
    end_date: "",
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

      const response = await getFetchFinYearList({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      });
      console.log(response.data);

      const itemsData = response.data.data || [];

      setItemsList([...itemsData]);
      setRowCount(response.data.pagenation?.total || 0);
    } catch (err) {
      console.error("Failed to fetch finyear List", err);
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
        response = await updateFinYear(editId, data);
      } else {
        response = await createFinYear(data);
      }

      console.log(response.data);

      if (response.data.success === true) {
        alert(editId ? "Finance year updated successfully!" : "Finance year created successfully!");

        onClearClick();
        fetchItemsData();
      } else {
        alert(response.data?.message ?? "Failed to create Finance year");
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
      year_code: row.year_code,
      start_date: row.start_date,
      end_date: row.end_date,
      status: row.status == true,
    });

    setEditId(row.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header */}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          mb={3}
          gap={2}
        >
          <Typography variant="h6" fontWeight={700}>
            📅 Financial Year Master
          </Typography>

          <Box display="flex" gap={1} >
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

        {/* Form Card */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Stack direction="row" spacing={2}>
            <RHFTextField name="year_code" label="Financial Year Code*" placeholder="Enter year code" />

            <RHFTextField type="date" name="start_date" label="Start Date*" InputLabelProps={{ shrink: true }}
            />

            <RHFTextField type="date" name="end_date" label="End Date*" InputLabelProps={{ shrink: true }}
            />

            <RHFCheckbox name="status" label="Active" sx={{ width: 500 }} />

          </Stack>
        </Paper>
      </FormProvider >

      {/* Table Card */}
      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: 700 }}>Code</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>End Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" rowSpan={2}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : itemsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
                  <TableCell>{row.year_code}</TableCell>
                  <TableCell>{row.start_date}</TableCell>
                  <TableCell>{row.end_date}</TableCell>
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
      </Paper >
    </Container >
  );
};

export default FinancialYearMaster;
