import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, Checkbox, IconButton, TextField, MenuItem, } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";

const SalesList = ({ rows, selected, setSelected, isMobile, setShowForm }) => {

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


    return (
        /* ======= Sales Order List (initial page) ======= */
        <Box sx={{ p: { xs: 2, md: 3 }, minHeight: "calc( 100vh - 56px)", backgroundColor: "#f5f7fb", }}>
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
                    <span role="img" aria-label="doc">🧾</span> AR Invoice List
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

                                <Box sx={{ display: "flex", gap: 1, width: "100px" }}>
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
    );
};

export default SalesList;