import React, { useState } from "react";
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, Checkbox, IconButton, TextField, MenuItem, } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';

const SalesDeliveryOrder = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // Sample list data
    const [rows] = useState([
        {
            id: 1,
            docEntry: "1",
            docNum: "SO-1001",
            docDate: "2025-09-01",
            customerCode: "C001",
            customerName: "Acme Supplies",
            docType: "Open",
        },
        {
            id: 2,
            docEntry: "2",
            docNum: "SO-1002",
            docDate: "2025-09-02",
            customerCode: "C002",
            customerName: "Global Traders",
            docType: "Open",
        },
        {
            id: 3,
            docEntry: "3",
            docNum: "SO-1003",
            docDate: "2025-09-03",
            customerCode: "C003",
            customerName: "Home Essentials",
            docType: "Open",
        },
    ]);

    // selection for export
    const [selected, setSelected] = useState([]);

    // toggle between list and form
    const [showForm, setShowForm] = useState(false);

    // basic form state (kept minimal)
    const [form, setForm] = useState({
        customerCode: "",
        customerName: "",
        contactPerson: "",
        postingDate: new Date().toISOString().slice(0, 10),
        documentNumber: "",
        documentDueDate: "",
        docType: "",
        orderType: "",
        placeOfSupply: "",
        subsidiary: "",
        project: "",
        currency: "",
        exchangeRate: "",
        billTo: "",
        shipTo: "",
        salesEmployee: "",
        billToAddress: "",
        shipToAddress: "",
        remarks: "",
        terms: "",
    });

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const toggleSelect = (id) => setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
    const toggleSelectAll = (checked) => setSelected(checked ? rows.map((r) => r.id) : []);

    const handleExport = () => {
        if (!selected.length) {
            alert("No rows selected for export.");
            return;
        }
        // placeholder export logic
        alert(`Exporting rows: ${selected.join(", ")}`);
    };

    const handleFormChange = (key, value) => setForm((s) => ({ ...s, [key]: value }));

    return (
        <div>
            {!showForm ? (
                /* ======= Sales Delivery List (initial page) ======= */
                <Box sx={{ p: { xs: 2, md: 3 }, backgroundColor: "#f5f7fb", minHeight: "calc( 100vh - 56px)" }}>
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                            flexDirection: { xs: "column", sm: "row" },
                            gap: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <span role="img" aria-label="doc">🧾</span> Sales Delivery List
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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
                                onClick={() => {
                                    setShowForm(true);
                                    // clear selection when moving to form
                                    setSelected([]);
                                }}
                                sx={{ textTransform: "none" }}
                            >
                                New
                            </Button>
                        </Box>
                    </Box>

                    {/* List: table on desktop, card list on mobile */}
                    {isMobile ? (
                        <Box display="flex" flexDirection="column" gap={2}>
                            {rows.map((r) => (
                                <Card key={r.id} variant="outlined">
                                    <CardContent sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                                        <Box>
                                            <Typography variant="subtitle2" gutterBottom>
                                                {r.docNum} — {r.customerName}
                                            </Typography>
                                            <Typography variant="body2">Doc Entry: {r.docEntry}</Typography>
                                            <Typography variant="body2">Date: {r.docDate}</Typography>
                                        </Box>

                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
                                            <Checkbox checked={isSelected(r.id)} onChange={() => toggleSelect(r.id)} />
                                            <IconButton size="small" aria-label="edit">
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    ) : (
                        <Paper>
                            <TableContainer sx={{ overflowX: "auto" }}>
                                <Table size="small">
                                    <TableHead sx={{ backgroundColor: "#f1f3f6" }}>
                                        <TableRow>
                                            <TableCell padding="checkbox" sx={{ fontWeight: "bold" }}>
                                                <Checkbox
                                                    checked={selected.length === rows.length && rows.length > 0}
                                                    indeterminate={selected.length > 0 && selected.length < rows.length}
                                                    onChange={(e) => toggleSelectAll(e.target.checked)}
                                                />
                                                Select
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Doc Entry</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Doc Num</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Doc Date</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Customer Code</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Customer Name</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((r) => (
                                            <TableRow key={r.id}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isSelected(r.id)} onChange={() => toggleSelect(r.id)} />
                                                </TableCell>
                                                <TableCell>{r.docEntry}</TableCell>
                                                <TableCell>{r.docNum}</TableCell>
                                                <TableCell>{r.docDate}</TableCell>
                                                <TableCell>{r.customerCode}</TableCell>
                                                <TableCell>{r.customerName}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton size="small" aria-label="edit">
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    )}
                </Box>
            ) : (
                /* ======= Sales Delivery Preparation Form (shown after New) ======= */
                <Box sx={{ p: { xs: 2, md: 3 }, backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
                    {/* Form Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                            flexDirection: { xs: "column", sm: "row" },
                            gap: 2,
                        }}
                    >
                        <Typography variant="h6">Sales Delivery Preparation</Typography>

                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                            <Button variant="outlined" startIcon={<PrintIcon />} sx={{ flex: { xs: "1 1 100%", sm: "auto" } }}>
                                Print
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<CancelIcon />}
                                sx={{ flex: { xs: "1 1 100%", sm: "auto" } }}
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </Button>
                            <Button variant="outlined" startIcon={<SaveIcon />} sx={{ flex: { xs: "1 1 100%", sm: "auto" } }}>
                                Save Draft
                            </Button>
                            <Button variant="contained" color="error" startIcon={<SendIcon />} sx={{ flex: { xs: "1 1 100%", sm: "auto" } }}>
                                Submit
                            </Button>
                        </Box>
                    </Box>

                    {/* Customer Information */}
                    <Paper sx={{ p: 3, mb: 2 }}>
                        <Typography variant="subtitle1" mb={2} sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
                            <PersonIcon color="primary" /> Customer Information
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                flexWrap: "wrap",
                                "& > *": { flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } },
                            }}
                        >
                            <TextField
                                select
                                size="small"
                                label="Customer Code"
                                value={form.customerCode}
                                onChange={(e) => handleFormChange("customerCode", e.target.value)}
                            >
                                <MenuItem value="">-- Select --</MenuItem>
                                <MenuItem value="C001">C001</MenuItem>
                                <MenuItem value="C002">C002</MenuItem>
                            </TextField>

                            <TextField
                                size="small"
                                label="Customer Name"
                                value={form.customerName}
                                onChange={(e) => handleFormChange("customerName", e.target.value)}
                            />

                            <TextField
                                size="small"
                                label="Contact Person"
                                value={form.contactPerson}
                                onChange={(e) => handleFormChange("contactPerson", e.target.value)}
                            />
                        </Box>
                    </Paper>

                    {/* Delivery Details */}
                    <Paper sx={{ p: 3, mb: 2 }}>
                        <Typography variant="subtitle1" mb={2} sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
                            <DescriptionIcon color="primary" /> Delivery Details
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                flexWrap: "wrap",
                                "& > *": { flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" } },
                            }}
                        >
                            <TextField
                                size="small"
                                label="Posting Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={form.postingDate}
                                onChange={(e) => handleFormChange("postingDate", e.target.value)}
                            />
                            <TextField
                                size="small"
                                label="Document Number"
                                value={form.documentNumber}
                                onChange={(e) => handleFormChange("documentNumber", e.target.value)}
                            />
                            <TextField
                                size="small"
                                label="Document Due Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={form.documentDueDate}
                                onChange={(e) => handleFormChange("documentDueDate", e.target.value)}
                            />
                            <TextField
                                select
                                size="small"
                                label="Doc Type"
                                value={form.docType}
                                onChange={(e) => handleFormChange("docType", e.target.value)}
                            >
                                <MenuItem value="">-- Select --</MenuItem>
                                <MenuItem value="Standard">Standard</MenuItem>
                            </TextField>

                            <TextField
                                select
                                size="small"
                                label="Delivery Type"
                                value={form.orderType}
                                onChange={(e) => handleFormChange("orderType", e.target.value)}
                            >
                                <MenuItem value="">-- Select --</MenuItem>
                                <MenuItem value="Online">Online</MenuItem>
                            </TextField>

                            <TextField
                                size="small"
                                label="Place of Supply"
                                value={form.placeOfSupply}
                                onChange={(e) => handleFormChange("placeOfSupply", e.target.value)}
                            />

                            <TextField
                                select
                                size="small"
                                label="Subsidiary"
                                value={form.subsidiary}
                                onChange={(e) => handleFormChange("subsidiary", e.target.value)}
                            >
                                <MenuItem value="">-- Select --</MenuItem>
                            </TextField>

                            <TextField
                                select
                                size="small"
                                label="Project"
                                value={form.project}
                                onChange={(e) => handleFormChange("project", e.target.value)}
                            >
                                <MenuItem value="">-- Select --</MenuItem>
                            </TextField>

                            <TextField
                                select
                                size="small"
                                label="Currency"
                                value={form.currency}
                                onChange={(e) => handleFormChange("currency", e.target.value)}
                            >
                                <MenuItem value="">-- Select --</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                            </TextField>

                            <TextField
                                size="small"
                                label="Exchange Rate"
                                value={form.exchangeRate}
                                onChange={(e) => handleFormChange("exchangeRate", e.target.value)}
                            />
                        </Box>
                    </Paper>

                    {/* Item Details (placeholder row) */}
                    <Paper sx={{ p: 2, mb: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="subtitle1" fontWeight="700">Item Details</Typography>
                            <Button startIcon={<AddIcon />} size="small">Add Row</Button>
                        </Box>

                        <TableContainer sx={{ overflowX: "auto" }}>
                            <Table size="small">
                                <TableHead sx={{ backgroundColor: "#f1f3f6" }}>
                                    <TableRow>
                                        <TableCell>S.No</TableCell>
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
                                    <TableRow>
                                        <TableCell>1</TableCell>
                                        <TableCell><TextField size="small" /></TableCell>
                                        <TableCell><TextField size="small" /></TableCell>
                                        <TableCell><TextField size="small" type="number" /></TableCell>
                                        <TableCell><TextField size="small" type="number" /></TableCell>
                                        <TableCell><TextField size="small" /></TableCell>
                                        <TableCell><TextField size="small" /></TableCell>
                                        <TableCell><TextField size="small" type="number" /></TableCell>
                                        <TableCell><TextField size="small" type="number" /></TableCell>
                                        <TableCell><TextField size="small" /></TableCell>
                                        <TableCell><TextField size="small" type="number" InputProps={{ readOnly: true }} /></TableCell>
                                        <TableCell><TextField size="small" type="number" InputProps={{ readOnly: true }} /></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    {/* Bill To / Ship To / Remarks / Totals */}
                    <Paper sx={{ p: 2, mb: 2 }}>
                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", "& > *": { flex: { xs: "1 1 100%", md: "1 1 30%" } }, mb: 2 }}>
                            <TextField select size="small" label="Bill To" value={form.billTo} onChange={(e) => handleFormChange("billTo", e.target.value)}>
                                <MenuItem value="">-- Select --</MenuItem>
                            </TextField>
                            <TextField select size="small" label="Ship To" value={form.shipTo} onChange={(e) => handleFormChange("shipTo", e.target.value)}>
                                <MenuItem value="">-- Select --</MenuItem>
                            </TextField>
                            <TextField select size="small" label="Sales Employee" value={form.salesEmployee} onChange={(e) => handleFormChange("salesEmployee", e.target.value)}>
                                <MenuItem value="">-- Select --</MenuItem>
                            </TextField>
                        </Box>

                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
                            <TextField label="Bill To Address" value={form.billToAddress} onChange={(e) => handleFormChange("billToAddress", e.target.value)} multiline rows={2} sx={{ flex: { xs: "1 1 100%", md: "1 1 49%" } }} />
                            <TextField label="Ship To Address" value={form.shipToAddress} onChange={(e) => handleFormChange("shipToAddress", e.target.value)} multiline rows={2} sx={{ flex: { xs: "1 1 100%", md: "1 1 49%" } }} />
                        </Box>

                        <TextField label="Remarks" value={form.remarks} onChange={(e) => handleFormChange("remarks", e.target.value)} multiline rows={2} fullWidth sx={{ mb: 2 }} />

                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 6, flexWrap: "wrap" }}>
                            <Box>
                                <Typography variant="caption">Sub Total</Typography>
                                <Typography fontWeight={700}>$0.00</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption">Tax (9%)</Typography>
                                <Typography fontWeight={700}>$0.00</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption">Discount</Typography>
                                <Typography fontWeight={700}>$0.00</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption">Total Amount</Typography>
                                <Typography fontWeight={800}>$0.00</Typography>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Terms & Conditions */}
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="subtitle1" mb={1}>Terms & Conditions</Typography>
                        <TextField placeholder="Enter Terms and Conditions" multiline rows={4} fullWidth value={form.terms} onChange={(e) => handleFormChange("terms", e.target.value)} />
                    </Paper>
                </Box>
            )}
        </div>
    );
};

export default SalesDeliveryOrder;