import React, { useState } from 'react';
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
  Typography,
} from '@mui/material';
import {
  Save as SaveIcon,
  Clear as ClearIcon,
  Close as CancelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const SubsidyCompanyMaster = () => {
  const [form, setForm] = useState({
    parentCompany: '',
    code: '',
    name: '',
    uen: '',
    gst: '',
    email: '',
    phone: '',
    website: '',
    street: '',
    city: '',
    building: '',
    postalCode: '',
    active: true,
  });

  const [rows] = useState([
    { code: 'PT001', name: 'Company name1', uen: '756884454', gst: 'T08LL1234A', email: 'Some@mail.com' },
    { code: 'PT002', name: 'Company name2', uen: '857884454', gst: 'T08LL1234A', email: 'Some1@mail.com' },
    { code: 'PT003', name: 'Company name3', uen: '956884454', gst: 'T08LL1234A', email: 'Some2@mail.com' },
    { code: 'PT004', name: 'Company name4', uen: '765688445', gst: 'T08LL1234A', email: 'Some3@mail.com' },
    { code: 'PT005', name: 'Company name5', uen: '758546433', gst: 'T08LL1234A', email: 'Some4@mail.com' },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('save', form);
  };

  const handleClear = () =>
    setForm({
      parentCompany: '',
      code: '',
      name: '',
      uen: '',
      gst: '',
      email: '',
      phone: '',
      website: '',
      street: '',
      city: '',
      building: '',
      postalCode: '',
      active: true,
    });

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header */}
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

        <Box display="flex" gap={1} flexWrap="wrap">
          <Button variant="contained" color="error" startIcon={<SaveIcon />} onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="info" startIcon={<ClearIcon />} onClick={handleClear}>
            Clear
          </Button>
          <Button variant="contained" color="primary" startIcon={<CancelIcon />}>
            Cancel
          </Button>
        </Box>
      </Box>

      {/* Form Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box flex="1 1 220px">
              <Select
                fullWidth
                size="small"
                name="parentCompany"
                value={form.parentCompany}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="">Parent Company</MenuItem>
                <MenuItem value="Parent1">Parent 1</MenuItem>
                <MenuItem value="Parent2">Parent 2</MenuItem>
              </Select>
            </Box>

            <Box flex="1 1 220px">
              <TextField
                fullWidth
                size="small"
                label="Subsidiary Code"
                name="code"
                value={form.code}
                onChange={handleChange}
              />
            </Box>

            <Box flex="1 1 220px">
              <TextField
                fullWidth
                size="small"
                label="Subsidiary Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Box>

            <Box flex="1 1 220px">
              <TextField
                fullWidth
                size="small"
                label="UEN"
                name="uen"
                value={form.uen}
                onChange={handleChange}
              />
            </Box>

            <Box flex="1 1 220px">
              <TextField
                fullWidth
                size="small"
                label="GST Number"
                name="gst"
                value={form.gst}
                onChange={handleChange}
              />
            </Box>

            <Box flex="1 1 220px">
              <TextField
                fullWidth
                size="small"
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </Box>

            <Box flex="1 1 220px">
              <TextField
                fullWidth
                size="small"
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </Box>

            <Box flex="1 1 220px">
              <TextField
                fullWidth
                size="small"
                label="Website"
                name="website"
                value={form.website}
                onChange={handleChange}
              />
            </Box>

            <Box flex="1 1 220px">
              <TextField
                fullWidth
                size="small"
                label="Street"
                name="street"
                value={form.street}
                onChange={handleChange}
              />
            </Box>

            <Box flex="1 1 220px">
              <TextField
                fullWidth
                size="small"
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </Box>

            <Box flex="1 1 220px">
              <TextField
                fullWidth
                size="small"
                label="Building"
                name="building"
                value={form.building}
                onChange={handleChange}
              />
            </Box>

            <Box flex="1 1 220px">
              <TextField
                fullWidth
                size="small"
                label="Postal Code"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Table Card */}
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Code</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>UEN</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>GST</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i} hover>
                <TableCell>{r.code}</TableCell>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.uen}</TableCell>
                <TableCell>{r.gst}</TableCell>
                <TableCell>{r.email}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SubsidyCompanyMaster;
