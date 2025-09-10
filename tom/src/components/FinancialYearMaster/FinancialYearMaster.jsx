import React, { useState } from 'react';
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
  Typography,
} from '@mui/material';
import {
  Save as SaveIcon,
  Clear as ClearIcon,
  Close as CancelIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const FinancialYearMaster = () => {
  const [form, setForm] = useState({
    code: '',
    startDate: '',
    endDate: '',
    active: true,
  });

  const [rows] = useState([
    { code: 'PT001', start: '03 - 05 - 2024', end: '03 - 05 - 2028', active: true },
    { code: 'PT002', start: '01 - 08 - 2023', end: '03 - 05 - 2030', active: false },
    { code: 'PT003', start: '08 - 09 - 2025', end: '03 - 05 - 2028', active: true },
    { code: 'PT004', start: '05 - 02 - 2021', end: '03 - 05 - 2031', active: false },
    { code: 'PT005', start: '06 - 09 - 2019', end: '03 - 05 - 2021', active: true },
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = () => {
    console.log('save', form);
  };

  const handleClear = () =>
    setForm({
      code: '',
      startDate: '',
      endDate: '',
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
          📅 Financial Year Master
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
            justifyContent="space-between"
            alignItems="center"
          >
            <Box flex="1 1 220px">
              <TextField
                fullWidth
                size="small"
                label="Financial Year Code"
                name="code"
                value={form.code}
                onChange={handleChange}
                placeholder="e.g. PT001"
              />
            </Box>

            <Box flex="1 1 220px">
              <TextField
                fullWidth
                size="small"
                label="Start Date"
                name="startDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={form.startDate}
                onChange={handleChange}
              />
            </Box>

            <Box flex="1 1 220px">
              <TextField
                fullWidth
                size="small"
                label="End Date"
                name="endDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={form.endDate}
                onChange={handleChange}
              />
            </Box>

            <Box flex="1 1 120px" display="flex" alignItems="center" gap={1}>
              <Checkbox checked={form.active} name="active" onChange={handleChange} />
              <Typography variant="body2">Active</Typography>
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
              <TableCell sx={{ fontWeight: 700 }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>End Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i} hover>
                <TableCell>{r.code}</TableCell>
                <TableCell>{r.start}</TableCell>
                <TableCell>{r.end}</TableCell>
                <TableCell>
                  <Checkbox checked={r.active} disabled />
                </TableCell>
                <TableCell>
                  <IconButton size="small" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FinancialYearMaster;
