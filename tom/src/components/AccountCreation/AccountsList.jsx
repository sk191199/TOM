import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Checkbox, Paper, IconButton, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Dialog, DialogTitle, DialogContent, CircularProgress, } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getFetchAllAccounts } from "../../services/api";
import AddAccount from "./AddAccounts";
import AccountEditsComponent from "./AccountEditsComponent";

const AccountList = () => {
    const [showForm, setShowForm] = useState(false);
    const [showData, setShowData] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [rowCount, setRowCount] = useState(0);

    // For details dialog
    const [selectedAccount, setSelectedAccount] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getFetchAllAccounts({
                page: paginationModel.page + 1, // backend is 1-based
                limit: paginationModel.pageSize,
            });
            console.log(response.data);

            const accData = response.data.data || [];
            setAccounts(accData);
            setRowCount(response.data.pagenation?.total || 0); // total records from backend
        } catch (err) {
            console.error("Failed to fetch accounts", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [paginationModel]);

    const onCloseSingleData = () => {
        setSelectedAccount(null);
        setShowForm(false);
        setShowData(false);
    }

    const refresh = () => {
        fetchData();
    };

    return (
        <div style={{ backgroundColor: "#f5f8fc", minHeight: "calc( 100vh - 56px)", padding: "16px" }}>
            {/* ===================== LIST VIEW ===================== */}
            {!showForm && !showData && (
                <>
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                            flexWrap: "wrap",
                            gap: 1,
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold">
                            📘 Accounts List
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                            <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
                                New
                            </Button>
                            <Button variant="contained" color="error">
                                Export Selected
                            </Button>
                        </Box>
                    </Box>

                    {/* Table */}
                    <Paper sx={{ overflowX: "auto" }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f1f3f6" }}>
                                    <TableCell sx={{ fontWeight: "bold" }}>Account ID</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Account Code</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Account Name</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                                    <TableCell sx={{ textAlign: "center", fontWeight: "bold" }} >Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" rowSpan={2}>
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : accounts.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    accounts.map((acc, index) => (
                                        <TableRow
                                            key={acc.id}
                                            sx={{
                                                backgroundColor: index % 2 === 1 ? "#fafafa" : "inherit", // alternate rows
                                            }}
                                        >
                                            <TableCell>{acc.id}</TableCell>
                                            <TableCell>{acc.number}</TableCell>
                                            <TableCell>{acc.account_name}</TableCell>
                                            <TableCell>
                                                {acc.active ? <p style={{ color: "green" }}>Active</p> : <p style={{ color: "red" }}>Inactive</p>}
                                                {/* <Checkbox checked={acc.active} /> */}
                                            </TableCell>
                                            <TableCell sx={{ textAlign: "center" }} >
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => { setSelectedAccount(acc); setShowData(true) }}
                                                >
                                                    <VisibilityIcon />
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
                </>
            )}

            {showForm && !showData && <AddAccount setShowForm={setShowForm} onClose={onCloseSingleData} />}
            {!showForm && showData &&
                <AccountEditsComponent account={selectedAccount} onClose={onCloseSingleData} refresh={refresh} />
            }
        </div>
    );
};

export default AccountList;