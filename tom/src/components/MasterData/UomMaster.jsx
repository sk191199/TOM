import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormProvider, RHFCheckbox, RHFTextField } from "../hook-form";
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
  Paper, Stack, CircularProgress, TablePagination, Container
} from "@mui/material";
import { Edit, Save, Clear, Check, Close } from "@mui/icons-material";
import { createUOM, updateUOM, getFetchUOMList } from "../../services/api";

const UomMaster = () => {
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
    uom_name: Yup.string().required("UOM name is required"),
    status: Yup.boolean(),
  });

  const defaultValues = {
    uom_name: "",
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

      const response = await getFetchUOMList({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      });
      console.log(response.data);

      const itemsData = response.data.data || [];

      setItemsList([...itemsData]);
      setRowCount(response.data.pagenation?.total || 0);
    } catch (err) {
      console.error("Failed to fetch uom List", err);
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
        response = await updateUOM(editId, data);
      } else {
        response = await createUOM(data);
      }

      console.log(response.data);

      if (response.data.success === true) {
        alert(editId ? "UOM updated successfully!" : "UOM created successfully!");

        onClearClick();
        fetchItemsData();
      } else {
        alert(response.data?.message ?? "Failed to create UOM");
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
      uom_name: row.uom_name,
      status: row.status == true,
    });

    setEditId(row.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, }}>
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

        {/* Form */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Stack direction="row" spacing={2}>
            <RHFTextField name="uom_name" label="UOM Name*" placeholder="Enter uom name" sx={{ width: 300 }} />

            <RHFCheckbox name="status" label="Active" sx={{ width: 300 }} />

          </Stack>

        </Paper>
      </FormProvider>

      {/* Table */}
      <Paper sx={{ overflowX: "auto" }}>

        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>UOM Name</b></TableCell>
              <TableCell><b>Active</b></TableCell>
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
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.uom_name}</TableCell>
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

export default UomMaster;
