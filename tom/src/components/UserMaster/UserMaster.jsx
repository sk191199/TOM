import React, { useEffect, useState } from 'react'
import { Box, Paper, TextField, Button, IconButton, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select, FormControl, InputLabel, FormControlLabel, CircularProgress, TablePagination, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
// import CancelIcon from '@mui/icons-material/Cancel'
import PersonIcon from '@mui/icons-material/Person'
import SaveIcon from "@mui/icons-material/Save";
import { createUser, getFetchAllUsers, getFetchRoles } from '../../services/api'
import CloseIcon from '@mui/icons-material/Close';

const SIDEBAR_WIDTH_EXPANDED = 220
const SIDEBAR_WIDTH_COLLAPSED = 60
const STORAGE_KEY = "tomuc"

const UserMaster = ({ sidebarOpen }) => {
  const sidebarWidth = sidebarOpen ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [rowCount, setRowCount] = useState(0);
  const [usersList, setUsersList] = useState([]);

  // form states
  const [roleId, setroleId] = useState("");
  const [userId, setuserId] = useState("");
  const [userName, setuserName] = useState("");
  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setinputPassword] = useState("");
  const [active, setActive] = useState(false);

  // validation errors
  const [errors, setErrors] = useState({});

  // fetch dropdowns
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const fchroles = await getFetchRoles();
        setRoles(fchroles.data.data || []);
      } catch (err) {
        console.error("Failed to fetch dropdown data", err);
      }
    };
    fetchDropdowns();
  }, []);

  // fetch users
  const fetchUsersData = async () => {
    try {
      setLoading(true);
      const response = await getFetchAllUsers({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      });
      const usersData = response.data.data || [];
      setUsersList(usersData);
      setRowCount(response.data.pagenation?.total || 0);
    } catch (err) {
      console.error("Failed to fetch Users List", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, [paginationModel]);

  // ✅ check localStorage on open
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setuserId(parsed.userId || "");
      setuserName(parsed.userName || "");
      setroleId(parsed.roleId || "");
      setinputEmail(parsed.inputEmail || "");
      setinputPassword(parsed.inputPassword || "");
      setActive(parsed.active || false);
    }
  }, []);

  // ✅ validate fields
  const validateForm = () => {
    let newErrors = {};
    if (!userId) newErrors.userId = "User ID is required";
    if (!userName) newErrors.userName = "User Name is required";
    if (!roleId) newErrors.roleId = "Role is required";
    if (!inputEmail) newErrors.inputEmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(inputEmail)) newErrors.inputEmail = "Invalid email";
    if (!inputPassword) newErrors.inputPassword = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ cancel → clear fields + localStorage
  const onHandleCancel = () => {
    setuserId("");
    setuserName("");
    setroleId("");
    setinputEmail("");
    setinputPassword("");
    setActive(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  // ✅ save draft → store in localStorage
  const onHandleSave = () => {
    const data = { userId, userName, roleId, inputEmail, inputPassword, active };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  // ✅ submit → with validation
  const onHandleCreateUserClick = async () => {
    if (!validateForm()) return;
    const payloadData = {
      user_id: userId,
      username: userName,
      role: Number(roleId),
      email: inputEmail,
      password: inputPassword,
      is_active: active,
    };
    try {
      const response = await createUser(payloadData);
      if (response.data.status === 201) {
        fetchUsersData();
        onHandleCancel(); // clear after submit
      }
    } catch (err) {
      console.error("Error creating account:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ edit → populate fields
  const onHandleEdit = (row) => {
    setuserId(row.user_id);
    setuserName(row.username);
    setroleId(row.Role.role_id);
    setinputEmail(row.email);
    setinputPassword(""); // security: don't auto-fill password
    setActive(row.active);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{ p: 2, bgcolor: '#f7f9fb', minHeight: 'calc( 100vh - 56px)', width: `calc(100vw - ${sidebarWidth}px)` }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        gap={1}
      >
        <PersonIcon color='primary' />
        User Master
      </Typography>

      {/* Form */}
      <Paper sx={{ p: 3, mb: 2, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <TextField
            label="User ID"
            size="small"
            value={userId}
            onChange={(e) => setuserId(e.target.value)}
            error={!!errors.userId}
            helperText={errors.userId}
          />
          <TextField
            label="User Name"
            size="small"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            error={!!errors.userName}
            helperText={errors.userName}
          />
          <FormControl sx={{ flex: "1 1 100px" }} size="small" error={!!errors.roleId}>
            <InputLabel>Roles</InputLabel>
            <Select value={roleId} onChange={(e) => setroleId(e.target.value)}>
              {roles.map((g) => (
                <MenuItem key={g.role_id} value={g.role_id}>{g.role}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Email"
            size="small"
            type="email"
            value={inputEmail}
            onChange={(e) => setinputEmail(e.target.value)}
            error={!!errors.inputEmail}
            helperText={errors.inputEmail}
          />
          <TextField
            label="Password"
            size="small"
            type="password"
            value={inputPassword}
            onChange={(e) => setinputPassword(e.target.value)}
            error={!!errors.inputPassword}
            helperText={errors.inputPassword}
          />
          <FormControlLabel
            control={<Checkbox checked={active} onChange={(e) => setActive(e.target.checked)} />}
            label="Active"
          />
        </Box>

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: "flex-end", }}>
          <Button variant="outlined" startIcon={<CloseIcon />} sx={{ fontWeight: "bold" }} onClick={onHandleCancel} >Cancel</Button>
          <Button variant="outlined" startIcon={<SaveIcon />} onClick={onHandleSave}>Save Draft</Button>
          <Button variant="outlined" color="info" startIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />} sx={{ fontSize: 13, px: 2, minWidth: 150, height: 38 }}> Convert to Order </Button>
          <Button variant="contained" color="error" onClick={onHandleCreateUserClick}>Submit</Button>
        </Box>
      </Paper>

      {/* Table */}
      <Paper sx={{ borderRadius: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f1f3f6" }}>
                <TableCell>User id</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} align="center"><CircularProgress /></TableCell></TableRow>
              ) : usersList.length === 0 ? (
                <TableRow><TableCell colSpan={6} align="center">No data available</TableCell></TableRow>
              ) : (
                usersList.map((row, idx) => (
                  <TableRow key={row.id} sx={{ backgroundColor: idx % 2 === 1 ? "#fafafa" : "inherit" }}>
                    <TableCell>{row.user_id}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.Role.role}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.active ? "Active" : "Inactive"}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => onHandleEdit(row)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={rowCount}
            page={paginationModel.page}
            onPageChange={(_, newPage) => setPaginationModel(prev => ({ ...prev, page: newPage }))}
            rowsPerPage={paginationModel.pageSize}
            onRowsPerPageChange={(e) => setPaginationModel({ page: 0, pageSize: parseInt(e.target.value, 10) })}
            rowsPerPageOptions={[10, 25, 50, 100]}
          />
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default UserMaster