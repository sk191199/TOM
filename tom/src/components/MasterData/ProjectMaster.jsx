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
  Select,
  MenuItem,
  useMediaQuery, Stack, CircularProgress, TablePagination, Grid, Container
} from "@mui/material";
import { Edit, Save, Clear, } from "@mui/icons-material";
import { createProject, updateProject, getFetchProjectList, getFetchSubCompanies } from "../../services/api";


const ProjectMaster = () => {
  const [itemsList, setItemsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);
  const [editId, setEditId] = useState(null);
  const [subCompanies, setSubCompanies] = useState([]);

  const schema = Yup.object().shape({
    sub_company_code: Yup.string().required("Sub company is required"),
    project_code: Yup.string().required("Project code is required"),
    project_name: Yup.string().required("Project name is required"),
    status: Yup.string().required("Status is required"),
    start_date: Yup.string().required("Start date is required"),
    end_date: Yup.string()
      .required("End date is required")
      .test("is-after-start", "End date must be after start date", function (value) {
        const { start_date } = this.parent;
        return !start_date || !value || new Date(value) >= new Date(start_date);
      }),
    description: Yup.string().required("Description is required"),
  });

  const defaultValues = {
    sub_company_code: "",
    project_code: "",
    project_name: "",
    status: "",
    start_date: "",
    end_date: "",
    description: "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const fetchItemsData = async () => {
    try {
      setLoading(true);

      const response = await getFetchProjectList({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      });
      console.log(response.data);

      const itemsData = response.data.data || [];

      setItemsList([...itemsData]);
      setRowCount(response.data.pagenation?.total || 0);
    } catch (err) {
      console.error("Failed to fetch project List", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchItemsData();
  }, [paginationModel]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const fchCompanies = await getFetchSubCompanies({ page: 0 });
        console.log(fchCompanies.data.data);
        setSubCompanies(fchCompanies.data.data || []);
      } catch (err) {
        console.error("Failed to fetch dropdown data", err);
      }
    };

    fetchDropdowns();
  }, []);

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      let response;

      if (editId) {
        response = await updateProject(editId, data);
      } else {
        response = await createProject({ ...data, is_main: false });
      }

      console.log(response.data);

      if (response.data.success === true) {
        alert(editId ? "Project updated successfully!" : "Project created successfully!");

        onClearClick();
        fetchItemsData();
      } else {
        alert(response.data?.message ?? "Failed to create Project company");
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
    const sanitizedRow = Object.keys(defaultValues).reduce((acc, key) => {
      acc[key] = row[key] ?? defaultValues[key];
      return acc;
    }, {});

    reset(sanitizedRow);
    setEditId(row.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header */}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

        <Box display="flex" justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} mb={2} flexDirection={{ xs: 'column', md: 'row' }}
          gap={2}>
          <Typography variant="h6" fontWeight="bold">
            📂 Project Master
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

        {/* Form Section */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="sub_company_code" label="Sub Company*" select>
                {subCompanies?.map((item, index) => (
                  <MenuItem key={index} value={item.sub_company_code}>
                    {item.sub_company_name}
                  </MenuItem>
                ))}
              </RHFTextField>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="project_code" label="Project Code*" disabled={editId != null}
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
              <RHFTextField name="project_name" label="Project Name*"
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
              <RHFTextField name="status" label="Status*" select>
                <MenuItem value="Creation">Creation</MenuItem>
                <MenuItem value="Inprogress">Inprogress</MenuItem>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </RHFTextField>
            </Grid>


            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
              <RHFTextField type="date" name="start_date" label="Start Date*" InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
              <RHFTextField type="date" name="end_date" label="End Date*" InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <RHFTextField name="description" label="Description*" multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </Paper>
      </FormProvider >

      {/* Table Section */}
      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><b>Code</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Start Date</b></TableCell>
              <TableCell><b>End Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" rowSpan={2}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : itemsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
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
                  <TableCell>{row.project_code}</TableCell>
                  <TableCell>{row.project_name}</TableCell>
                  <TableCell>{row.start_date}</TableCell>
                  <TableCell>{row.end_date}</TableCell>
                  <TableCell>{row.status}</TableCell>
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
    </Container >
  );
};

export default ProjectMaster;
