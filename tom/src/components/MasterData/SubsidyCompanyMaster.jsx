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
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography, Paper, Stack, CircularProgress, TablePagination, Grid
} from '@mui/material';
import { Edit, Save, Clear, } from "@mui/icons-material";
import { createSubCompany, updateSubCompany, getFetchSubCompanyList, getFetchCompanyTypes, getFetchAllCompanies } from "../../services/api";

const SubsidyCompanyMaster = () => {
  const [itemsList, setItemsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);
  const [editId, setEditId] = useState(null);
  const [companyTypes, setCompanyTypes] = useState([]);
  const [parentCompanies, setParentCompanies] = useState([]);


  const schema = Yup.object().shape({
    parent_company_id: Yup.string().required("Parent company is required"),
    sub_company_code: Yup.string().required("Company code is required"),
    sub_company_name: Yup.string().required("Company name is required"),
    uen_number: Yup.string()
      .required("UEN is required"),
    gst_number: Yup.string().required("GST is required"),
    company_type: Yup.string().required("Company type is required"),
    date_of_incorporation: Yup.string().required("Date of incorportion is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{8,15}$/, "Enter a valid phone number"),
    website: Yup.string()
      .url("Enter a valid website URL")
      .required("Website is required"),
    street_address: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    building_number: Yup.string().required("Building is required"),
    postel_code: Yup.string()
      .required("Postal code is required")
      .matches(/^[0-9]{5,10}$/, "Enter a valid postal code"),
    country: Yup.string().required("Country is required"),
  });

  const defaultValues = {
    parent_company_id: "",
    sub_company_code: "",
    sub_company_name: "",
    uen_number: "",
    gst_number: "",
    company_type: "",
    date_of_incorporation: "",
    email: "",
    phone: "",
    website: "",
    street_address: "",
    city: "",
    building_number: "",
    postel_code: "",
    country: "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const fetchItemsData = async () => {
    try {
      setLoading(true);

      const response = await getFetchSubCompanyList({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      });
      console.log(response.data);

      const itemsData = response.data.data || [];

      setItemsList([...itemsData]);
      setRowCount(response.data.pagenation?.total || 0);
    } catch (err) {
      console.error("Failed to fetch subcompany List", err);
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
        const fchtypes = await getFetchCompanyTypes();
        console.log(fchtypes.data.data);
        setCompanyTypes(fchtypes.data.data || []);

        const fchCompanies = await getFetchAllCompanies({ page: 0 });
        console.log(fchCompanies.data.data);
        setParentCompanies(fchCompanies.data.data || []);
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
        response = await updateSubCompany(editId, data);
      } else {
        response = await createSubCompany({ ...data, is_main: false });
      }

      console.log(response.data);

      if (response.data.success === true) {
        alert(editId ? "Subsidy company updated successfully!" : "Subsidy company created successfully!");

        onClearClick();
        fetchItemsData();
      } else {
        alert(response.data?.message ?? "Failed to create Subsidy company");
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
    setEditId(row.sub_company_code);
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
            🏢 Subsidy Company Master
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
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="parent_company_id" label="Parent Company*" select>
                {parentCompanies?.map((item, index) => (
                  <MenuItem key={index} value={item.company_id}>
                    {item.company_name}
                  </MenuItem>
                ))}
              </RHFTextField>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="sub_company_code" label="Subsidiary Code*" disabled={editId != null}
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="sub_company_name" label="Subsidiary Name*"
              /> </Grid>


            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="uen_number" label="UEN*" disabled={editId != null}
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="gst_number" label="GST Number*" disabled={editId != null}
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="company_type" label="Company Type*"
                select>
                {companyTypes?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.type}
                  </MenuItem>
                ))}
              </RHFTextField>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField type="date" name="date_of_incorporation" label="Date of Incorporation*"
                InputLabelProps={{ shrink: true }} />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="email" label="Email*"
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="phone" label="Phone*"
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="website" label="Website*"
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="street_address" label="Street Address*"
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="city" label="City*"
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="building_number" label="Building*"
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="postel_code" label="Postel Code*"
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <RHFTextField name="country" label="Country*"
              />
            </Grid>
          </Grid>
        </Paper>
      </FormProvider >


      {/* Table Card */}
      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: 700 }}>Code</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>UEN</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>GST</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
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
                  <TableCell>{row.sub_company_code}</TableCell>
                  <TableCell>{row.sub_company_name}</TableCell>
                  <TableCell>{row.uen_number}</TableCell>
                  <TableCell>{row.gst_number}</TableCell>
                  <TableCell>{row.email}</TableCell>
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

export default SubsidyCompanyMaster;
