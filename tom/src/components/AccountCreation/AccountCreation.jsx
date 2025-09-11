import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Checkbox, FormControlLabel, TextField, MenuItem, Paper, IconButton, Table, TableHead, TableRow, TableCell, TableBody, } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getFetchGroups, getFetchAccountTypes, getFetchSubCompanies, getFetchAllAccounts } from "../../services/api";
import AddAccount from "./AddAccounts";

const AccountCreation = () => {
  const [showForm, setShowForm] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getFetchAllAccounts({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      });
      console.log(response.data);

      const accData = response.data.data || [];
      const mappedData = accData.map((acc, index) => ({
        ...acc,
        // id: paginationModel.page * paginationModel.pageSize + index + 1,
        // createdAt: acc.createdAt?.slice(0, 10),
      }));
      setAccounts(mappedData);
    } catch (err) {
      console.error("Failed to fetch dropdown data", err);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // // Dummy data
  // const accounts = [
  //   { id: 1, code: "Ac-345556", name: "Name 1", status: true },
  //   { id: 2, code: "Ac-345556", name: "Name 2", status: true },
  //   { id: 3, code: "Ac-345556", name: "Name 3", status: true },
  //   { id: 4, code: "Ac-345556", name: "Name 4", status: true },
  //   { id: 5, code: "Ac-345556", name: "Name 5", status: true },
  // ];

  return (
    <div style={{ backgroundColor: "#f5f8fc", minHeight: "100vh", padding: "16px" }}>
      {/* ===================== LIST VIEW ===================== */}
      {!showForm ? (
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
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowForm(true)}
              >
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
                <TableRow>
                  {/* <TableCell>
                    <Checkbox /> Select All
                  </TableCell> */}
                  <TableCell>Account ID</TableCell>
                  <TableCell>Account Code</TableCell>
                  <TableCell>Account Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts.map((acc) => (
                  <TableRow key={acc.id}>
                    {/* <TableCell>
                      <Checkbox />
                    </TableCell> */}
                    <TableCell>{acc.id}</TableCell>
                    <TableCell>{acc.number}</TableCell>
                    <TableCell>{acc.account_name}</TableCell>
                    <TableCell>
                      <Checkbox checked={acc.active} />
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </>
      ) : (
        <AddAccount setShowForm={setShowForm} />
      )}
    </div>
  );
};

export default AccountCreation;
