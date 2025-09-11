import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Button, TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress, TablePagination, FormControl, InputLabel, Select, } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createCompany, getFetchAllCompanies, getFetchCompanyTypes } from "../../services/api";

const CompanyMaster = () => {
  const [companiesList, setCompaniesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);
  const [companyID, setcompanyID] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [uenNumber, setuenNumber] = useState("");
  const [gstNumber, setgstNumber] = useState("");
  const [companyType, setcompanyType] = useState("");
  const [dateOfIncorporation, setdateOfIncorporation] = useState("");
  const [streetAddress, setstreetAddress] = useState("");
  const [buildingNumber, setbuildingNumber] = useState("");
  const [city, setcity] = useState("");
  const [postelCode, setpostelCode] = useState("");
  const [country, setcountry] = useState("");
  const [emailId, setemailId] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [webSite, setwebSite] = useState("");
  const [logo, setlogo] = useState("");
  const [companyTypes, setCompanyTypes] = useState([]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const fchtypes = await getFetchCompanyTypes();
        console.log(fchtypes.data);
        setCompanyTypes(fchtypes.data.data || []);
      } catch (err) {
        console.error("Failed to fetch dropdown data", err);
      }
    };
    fetchDropdowns();
  }, []);

  const fetchCompaniesData = async () => {
    try {
      setLoading(true);
      const response = await getFetchAllCompanies({
        page: paginationModel.page + 1, // backend is 1-based
        limit: paginationModel.pageSize,
      });

      const companiesData = response.data.data || [];
      setCompaniesList(companiesData);
      setRowCount(response.data.pagenation?.total || 0); // total records from backend
    } catch (err) {
      console.error("Failed to fetch Companies List", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompaniesData();
  }, [paginationModel]);

  const onHandleKeyDown = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
  }

  const onHandleCreateCompanyClick = async () => {
    // checkings
    const payloadData = {
      company_id: companyID,
      company_name: companyName,
      uen_number: Number(uenNumber),
      gst_number: Number(gstNumber),
      company_type: Number(companyType),
      date_of_incorporation: dateOfIncorporation,
      street_address: streetAddress,
      building_number: Number(buildingNumber),
      city: city,
      postel_code: Number(postelCode),
      country: country,
      email: emailId,
      phone: Number(phoneNumber),
      website: webSite,
      // logo: logo
    }
    try {
      const response = await createCompany(payloadData);
      console.log(response.data);

      if (response.data.status === 201) {
        fetchCompaniesData();
      }
    } catch (err) {
      console.error("Error creating account:", err);
    } finally {
      setLoading(false);
    }
  }

  const onClearClick = () => {
    setcompanyID("");
    setcompanyName("");
    setuenNumber("");
    setgstNumber("");
    setcompanyType("");
    setdateOfIncorporation("");
    setstreetAddress("");
    setbuildingNumber("");
    setcity("");
    setpostelCode("");
    setcountry("");
    setemailId("");
    setphoneNumber("");
    setwebSite("");
    setlogo("");
  }

  const onEditClick = (company) => {
    setcompanyID(company.company_id);
    setcompanyName(company.company_name);
    setuenNumber(company.uen_number);
    setgstNumber(company.gst_number);
    setcompanyType(company.company_type);
    setdateOfIncorporation(company.date_of_incorporation);
    setstreetAddress(company.street_address);
    setbuildingNumber(company.building_number);
    setcity(company.city);
    setpostelCode(company.postel_code);
    setcountry(company.country);
    setemailId(company.email);
    setphoneNumber(company.phone);
    setwebSite(company.website);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f5f7fb", minHeight: "100vh" }}>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        {/* Left side */}
        <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 0 } }}>
          <BusinessIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Company Master
          </Typography>
        </Box>

        {/* Right side buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" color="error" startIcon={<SaveIcon />} onClick={() => onHandleCreateCompanyClick()}
          >
            Submit
          </Button>
          <Button variant="outlined" color="info" startIcon={<ClearIcon />} onClick={() => onClearClick()}>
            Clear
          </Button>
          {/* <Button variant="contained" color="primary" startIcon={<CancelIcon />}>
            Cancel
          </Button> */}
        </Box>
      </Box>

      {/* Form Section */}

      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <TextField label="Company ID" fullWidth
            value={companyID}
            onChange={(e) => setcompanyID(e.target.value)}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="Company Name" fullWidth
            value={companyName}
            onChange={(e) => setcompanyName(e.target.value)}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="UEN (Unique Entity Number)" fullWidth
            onKeyDown={(e) => onHandleKeyDown(e)}
            value={uenNumber}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setuenNumber(val);
            }}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="GST Registration Number" fullWidth
            onKeyDown={(e) => onHandleKeyDown(e)}
            value={gstNumber}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setgstNumber(val);
            }}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />

          <FormControl sx={{ flex: "1 1 250px" }} size="small" fullWidth >
            <InputLabel>Company Type</InputLabel>
            <Select
              value={companyType}
              onChange={(e) => setcompanyType(e.target.value)}
            >
              {companyTypes.map((g) => (
                <MenuItem key={g.id} value={g.id}>
                  {g.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }}
          >
            Company Logo
            <input
              type="file"
              hidden
              onChange={(e) => setlogo(e.target.files?.[0] || null)}
            />
          </Button>
          <TextField
            type="date"
            label="Date Of Incorporation"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={dateOfIncorporation}
            onChange={(e) => setdateOfIncorporation(e.target.value)}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }}
          />
          <TextField label="Street Address" fullWidth
            value={streetAddress}
            onChange={(e) => setstreetAddress(e.target.value)}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="Building / Unit Number" fullWidth
            onKeyDown={(e) => onHandleKeyDown(e)}
            value={buildingNumber}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setbuildingNumber(val);
            }}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="City" fullWidth
            value={city}
            onChange={(e) => setcity(e.target.value)}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="Postal Code" fullWidth
            onKeyDown={(e) => onHandleKeyDown(e)}
            value={postelCode}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setpostelCode(val);
            }}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="Country" fullWidth
            value={country}
            onChange={(e) => setcountry(e.target.value)}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="Email" type="email" fullWidth
            value={emailId}
            onChange={(e) => setemailId(e.target.value)}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="Phone" type="number" fullWidth
            onKeyDown={(e) => onHandleKeyDown(e)}
            value={phoneNumber}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setphoneNumber(val);
            }}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
          <TextField label="Website (Optional)" fullWidth
            value={webSite}
            onChange={(e) => setwebSite(e.target.value)}
            sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }} />
        </Box>
      </Paper>

      {/* Table Section */}
      <Paper sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>UEN</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>GST No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" rowSpan={2}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : companiesList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              companiesList.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: index % 2 === 1 ? "#fafafa" : "inherit", // alternate rows
                  }}
                >
                  <TableCell>{row.company_name}</TableCell>
                  <TableCell>{row.uen_number}</TableCell>
                  <TableCell>{row.gst_number}</TableCell>
                  <TableCell>{row.company_type}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell sx={{ textAlign: "center" }} >
                    <IconButton
                      color="primary"
                      onClick={() => onEditClick(row)}
                    >
                      <EditIcon />
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

export default CompanyMaster;
