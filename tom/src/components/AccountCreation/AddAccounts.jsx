import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Checkbox, FormControlLabel, TextField, MenuItem, Paper, IconButton, Table, TableHead, TableRow, TableCell, TableBody, InputLabel, Select, ListItemText, FormControl, FormHelperText, } from "@mui/material";
import { getFetchGroups, getFetchAccountTypes, getFetchSubCompanies, createChartAccount } from "../../services/api";

const AddAccount = ({ setShowForm, onClose }) => {
    const [groupTypes, setGroupTypes] = useState([]);
    const [selectedGroupTypeID, setSelectedGroupTypeID] = useState(null);
    const [accountTypes, setAccountTypes] = useState([]);
    const [selectedAccountTypeID, setSelectedAccountTypeID] = useState(null);
    const [subCompanies, setSubCompanies] = useState([]);
    const [selectedSubCompanyID, setSelectedSubCompanyID] = useState([]);
    const [accountCode, setAccountCode] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountDescription, setAccountDescription] = useState("");
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [storeErrMesg, setStoreErrMesg] = useState("");
    const [storeSuccessMesg, setStoreSuccessMesg] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const fchGrps = await getFetchGroups();
                const fchAccTyps = await getFetchAccountTypes();
                const fchSubComps = await getFetchSubCompanies();
                console.log(fchGrps.data);
                console.log(fchAccTyps.data);
                console.log(fchSubComps.data);
                setGroupTypes(fchGrps.data.data || []);
                setAccountTypes(fchAccTyps.data.data || []);
                setSubCompanies(fchSubComps.data.data || []);
            } catch (err) {
                console.error("Failed to fetch dropdown data", err);
            }
        };
        fetchDropdowns();
    }, []);

    const validateFields = () => {
        const newErrors = {};
        if (!accountCode) newErrors.accountCode = "Account Code is required";
        if (!accountName) newErrors.accountName = "Account Name is required";
        if (!selectedAccountTypeID) newErrors.accountType = "Account Type is required";
        if (!selectedGroupTypeID) newErrors.groupType = "Parent Account is required";
        if (selectedSubCompanyID.length === 0) newErrors.subCompanies = "At least one Subsidiary Account is required";
        if (!active) newErrors.active = "Active must be checked";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateFields()) return;

        setLoading(true);
        setStoreSuccessMesg("");

        const payload = {
            group_id: selectedGroupTypeID,
            account_name: accountName,
            active: active,
            number: Number(accountCode),
            description: accountDescription,
            account_type_id: selectedAccountTypeID,
            sub_companies: selectedSubCompanyID,
        };

        try {
            const res = await createChartAccount(payload);
            setStoreSuccessMesg(res.data.message);
        } catch (err) {
            console.error("Error creating account:", err);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setStoreSuccessMesg("");
                setShowForm(false);
            }, 5000);
        }
    };

    return (
        <>
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
                    📘 Account Creation
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button variant="outlined">Print</Button>
                    <Button variant="outlined">Save</Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => onClose()}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleSubmit()}>
                        Submit
                    </Button>
                </Box>
            </Box>

            {/* Form */}
            <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    {/* Account Code */}
                    <TextField
                        fullWidth
                        label="Account Code"
                        size="small"
                        sx={{ flex: "1 1 250px" }}
                        error={!!errors.accountCode}
                        helperText={errors.accountCode}
                        onKeyDown={(e) => {
                            if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                        }}
                        value={accountCode}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setAccountCode(val);
                        }}
                    />

                    {/* Account Name */}
                    <TextField
                        fullWidth
                        label="Account Name"
                        size="small"
                        sx={{ flex: "1 1 250px" }}
                        error={!!errors.accountName}
                        helperText={errors.accountName}
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                    />

                    {/* Description */}
                    <TextField
                        fullWidth
                        label="Description"
                        size="small"
                        sx={{ flex: "1 1 250px" }}
                        value={accountDescription}
                        onChange={(e) => setAccountDescription(e.target.value)}
                    />

                    {/* Account Type */}
                    <FormControl sx={{ flex: "1 1 250px" }} size="small" fullWidth error={!!errors.accountType}>
                        <InputLabel>Account Type</InputLabel>
                        <Select
                            value={selectedAccountTypeID}
                            onChange={(e) => setSelectedAccountTypeID(Number(e.target.value))}
                        >
                            {accountTypes.map((a) => (
                                <MenuItem key={a.account_id} value={a.account_id}>
                                    {a.account_type}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.accountType && <FormHelperText>{errors.accountType}</FormHelperText>}
                    </FormControl>

                    {/* Parent Account */}
                    <FormControl sx={{ flex: "1 1 250px" }} size="small" fullWidth error={!!errors.groupType}>
                        <InputLabel>Parent Account</InputLabel>
                        <Select
                            value={selectedGroupTypeID}
                            onChange={(e) => setSelectedGroupTypeID(Number(e.target.value))}
                        >
                            {groupTypes.map((g) => (
                                <MenuItem key={g.group_id} value={g.group_id}>
                                    {g.group_name}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.groupType && <FormHelperText>{errors.groupType}</FormHelperText>}
                    </FormControl>

                    {/* Subsidiary Account */}
                    <FormControl sx={{ flex: "1 1 250px" }} size="small" fullWidth error={!!errors.subCompanies}>
                        <InputLabel>Subsidiary Account</InputLabel>
                        <Select
                            multiple
                            value={selectedSubCompanyID}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val.includes("all")) {
                                    if (selectedSubCompanyID.length === subCompanies.length) {
                                        setSelectedSubCompanyID([]);
                                    } else {
                                        setSelectedSubCompanyID(subCompanies.map((s) => s.sub_company_code));
                                    }
                                } else {
                                    setSelectedSubCompanyID(val);
                                }
                            }}
                            renderValue={(selected) =>
                                selected.map((id) => {
                                    const company = subCompanies.find((s) => s.sub_company_code === id);
                                    return company ? company.sub_company_name : id;
                                }).join(", ")
                            }
                        >
                            <MenuItem value="all">
                                <Checkbox checked={selectedSubCompanyID.length === subCompanies.length} />
                                <ListItemText
                                    primary={selectedSubCompanyID.length === subCompanies.length ? "Unselect All" : "Select All"}
                                />
                            </MenuItem>
                            {subCompanies.map((s) => (
                                <MenuItem key={s.sub_company_code} value={s.sub_company_code}>
                                    <Checkbox checked={selectedSubCompanyID.includes(s.sub_company_code)} />
                                    <ListItemText primary={s.sub_company_name} />
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.subCompanies && <FormHelperText>{errors.subCompanies}</FormHelperText>}
                    </FormControl>

                    {/* Active Checkbox */}
                    <FormControl error={!!errors.active}>
                        <FormControlLabel
                            control={
                                <Checkbox checked={active} onChange={(e) => setActive(e.target.checked)} />
                            }
                            label="Active"
                        />
                        {errors.active && <FormHelperText>{errors.active}</FormHelperText>}
                    </FormControl>
                </Box>
                <Box>
                    {storeSuccessMesg && (
                        <Typography sx={{ color: "green", fontSize: "0.9rem", textAlign: "center" }}>
                            {storeSuccessMesg}
                        </Typography>
                    )}
                    {storeErrMesg && (
                        <Typography sx={{ color: "red", fontSize: "0.9rem", textAlign: "center" }}>
                            {storeErrMesg}
                        </Typography>
                    )}
                </Box>
            </Paper>
        </>
    );
};

export default AddAccount;


{/* <Box sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", md: "row" },
                                    justifyContent: { xs: "center", md: "space-between" },
                                    alignItems: "center",
                                    gap: 2,
                                    flexWrap: "wrap"
                                }}> */}