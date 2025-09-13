// SalesQuotationPage.jsx
import React, { useState } from "react";
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, TextField, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SendIcon from "@mui/icons-material/Send";

const sampleRows = [
  {
    id: 1,
    docNum: "doc345556",
    docDate: "13/06/2025",
    customerCode: "4.2864788",
    customerName: "C Name 1",
    docType: "Open",
  },
  {
    id: 2,
    docNum: "doc345557",
    docDate: "14/06/2025",
    customerCode: "4.2864799",
    customerName: "C Name 2",
    docType: "Open",
  },
  {
    id: 3,
    docNum: "doc345558",
    docDate: "15/06/2025",
    customerCode: "4.2864800",
    customerName: "C Name 3",
    docType: "Open",
  },
  {
    id: 4,
    docNum: "doc345559",
    docDate: "16/06/2025",
    customerCode: "4.2864801",
    customerName: "C Name 4",
    docType: "Open",
  },
  {
    id: 5,
    docNum: "doc345560",
    docDate: "17/06/2025",
    customerCode: "4.2864802",
    customerName: "C Name 5",
    docType: "Open",
  },
];

function SalesQuotationList({ onNew }) {
  const [rows] = useState(sampleRows);
  const [selected, setSelected] = useState([]);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleToggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) setSelected(rows.map((r) => r.id));
    else setSelected([]);
  };

  const handleExport = () => {
    // placeholder: hook this to your export logic
    console.log("Exporting selected:", selected);
    alert(`Exporting ${selected.length} selected rows (see console)`);
  };

  return (
    <Box sx={{ backgroundColor: "#f5f8fc", minHeight: "calc( 100vh - 56px)", p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          📄 Sales Quotation List
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<PrintIcon />}
            onClick={handleExport}
            disabled={selected.length === 0}
            sx={{ textTransform: "none" }}
          >
            Export Selected
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onNew}
            sx={{ textTransform: "none" }}
          >
            New
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f1f3f6" }}>
                <TableCell>
                  <Checkbox
                    onChange={handleSelectAll}
                    checked={selected.length === rows.length && rows.length > 0}
                    indeterminate={selected.length > 0 && selected.length < rows.length}
                  />
                  Select All
                </TableCell>
                <TableCell>Doc Entry</TableCell>
                <TableCell>Doc Num</TableCell>
                <TableCell>Doc Date</TableCell>
                <TableCell>Customer Code</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Document Type</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox checked={isSelected(row.id)} onChange={() => handleToggle(row.id)} />
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.docNum}</TableCell>
                  <TableCell>{row.docDate}</TableCell>
                  <TableCell>{row.customerCode}</TableCell>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.docType}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
}

function SalesQuotationPreparation({ onCancel }) {
  // static example items (you can wire in dynamic add/edit rows)
  const items = [
    {
      id: 1,
      code: "Item-001",
      desc: "Sample Item",
      qty: 10,
      rate: 100,
      uom: "Pc",
      hsn: "1234",
      discountPct: "5%",
      discountAmt: 50,
      taxCode: "GST",
      taxAmt: 20,
      amount: 1000,
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
      {/* Header with actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Sales Quotation Preparation
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "center", sm: "flex-end" },
            gap: 1,
          }}
        >
          <Button variant="outlined" size="small" sx={{ flex: { xs: "1 1 100%", sm: "auto" } }} startIcon={<PrintIcon />}>
            Print
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            sx={{ flex: { xs: "1 1 100%", sm: "auto" } }}
            startIcon={<CancelIcon />}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="secondary" size="small" sx={{ flex: { xs: "1 1 100%", sm: "auto" } }} startIcon={<SaveIcon />}>
            Save Draft
          </Button>
          <Button variant="outlined" color="info" size="small" sx={{ flex: { xs: "1 1 100%", sm: "auto" } }} startIcon={<ShoppingCartIcon />}>
            Convert to Order
          </Button>
          <Button variant="contained" color="error" size="small" sx={{ flex: { xs: "1 1 100%", sm: "auto" } }} startIcon={<SendIcon />}>
            Submit
          </Button>
        </Box>
      </Box>

      {/* The big form: each section is a Paper */}
      {/* Document Information */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Document Information
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TextField label="Document Number" fullWidth sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } }} />
          <TextField select label="Document Type" fullWidth sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } }}>
            <MenuItem value="Quotation">Quotation</MenuItem>
            <MenuItem value="Proforma">Proforma</MenuItem>
          </TextField>
          <TextField
            label="Posting Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } }}
          />
          <TextField label="Document Code" fullWidth sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } }} />
        </Box>
      </Paper>

      {/* Customer Information */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Customer Information
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TextField label="Customer Name" fullWidth sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%" } }} />
          <TextField label="Project" fullWidth sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%" } }} />
          <TextField label="Contact Person" fullWidth sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%" } }} />
        </Box>
      </Paper>

      {/* Quotation Details */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Quotation Details
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TextField label="Quotation Type" fullWidth sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } }} />
          <TextField label="Place of Delivery" fullWidth sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } }} />
          <TextField label="Salesperson" fullWidth sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } }} />
          <TextField label="Currency" fullWidth sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } }} />
          <TextField label="Exchange Rate" fullWidth sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } }} />
        </Box>
      </Paper>

      {/* Item Details */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">Item Details</Typography>
          <Button variant="outlined" size="small">Add Row</Button>
        </Box>

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f1f3f6" }}>
                <TableCell>Sr No</TableCell>
                <TableCell>Item Code</TableCell>
                <TableCell>Item Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>UOM</TableCell>
                <TableCell>HSN Code</TableCell>
                <TableCell>Discount %</TableCell>
                <TableCell>Discount Amt</TableCell>
                <TableCell>Tax Code</TableCell>
                <TableCell>Tax Amount</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((it) => (
                <TableRow key={it.id}>
                  <TableCell>{it.id}</TableCell>
                  <TableCell>{it.code}</TableCell>
                  <TableCell>{it.desc}</TableCell>
                  <TableCell>{it.qty}</TableCell>
                  <TableCell>{it.rate}</TableCell>
                  <TableCell>{it.uom}</TableCell>
                  <TableCell>{it.hsn}</TableCell>
                  <TableCell>{it.discountPct}</TableCell>
                  <TableCell>{it.discountAmt}</TableCell>
                  <TableCell>{it.taxCode}</TableCell>
                  <TableCell>{it.taxAmt}</TableCell>
                  <TableCell>{it.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Summary */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 4, flexWrap: "wrap" }}>
          <Typography>Sub Total: $0.00</Typography>
          <Typography>Tax (9%): $0.00</Typography>
          <Typography>Discount: $0.00</Typography>
          <Typography fontWeight="bold">Total Amount: $0.00</Typography>
        </Box>
      </Paper>

      {/* Terms & Conditions */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>Terms & Conditions</Typography>
        <TextField placeholder="Enter Terms & Conditions" multiline rows={3} fullWidth />
      </Paper>
    </Box>
  );
}

export default function SalesQuotationPage() {
  const [showForm, setShowForm] = useState(false);

  return showForm ? (
    <SalesQuotationPreparation onCancel={() => setShowForm(false)} />
  ) : (
    <SalesQuotationList onNew={() => setShowForm(true)} />
  );
}
