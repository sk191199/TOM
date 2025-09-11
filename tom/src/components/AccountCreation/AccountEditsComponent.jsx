import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { updateAccountDetails } from "../../services/api";

const AccountEditsComponent = ({ account, onClose, refresh }) => {
  const [editMode, setEditMode] = useState({
    name: false,
    status: false,
    description: false,
  });

  const [formData, setFormData] = useState({
    account_name: account.account_name,
    active: account.active,
    description: account.description,
  });

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSave = async () => {
    try {
      await updateAccountDetails(account.id, formData);
      setConfirmOpen(false);
      setEditMode({ name: false, status: false, description: false });
      refresh(); // re-fetch accounts list
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3, maxWidth: 700, mx: "auto" }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
      >
        Account Details
      </Typography>

      <Box sx={{ display: "grid", gap: 2 }}>
        {/* Account ID */}
        <Typography><b>Account ID:</b> {account.id}</Typography>

        {/* Account Code */}
        <Typography><b>Account Code:</b> {account.number}</Typography>

        {/* Account Name (editable) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <b>Account Name:</b>
          {editMode.name ? (
            <TextField
              size="small"
              value={formData.account_name}
              onChange={(e) =>
                setFormData({ ...formData, account_name: e.target.value })
              }
            />
          ) : (
            <Typography>{formData.account_name}</Typography>
          )}
          <IconButton
            size="small"
            color={editMode.name ? "success" : "primary"}
            onClick={() =>
              editMode.name
                ? setConfirmOpen(true)
                : setEditMode({ ...editMode, name: true })
            }
          >
            {editMode.name ? <SaveIcon /> : <EditIcon />}
          </IconButton>
          {editMode.name && (
            <IconButton
              size="small"
              color="error"
              onClick={() =>
                setEditMode({ ...editMode, name: false }) ||
                setFormData({ ...formData, account_name: account.account_name })
              }
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        {/* Status (editable) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <b>Status:</b>
          {editMode.status ? (
            <TextField
              size="small"
              select
              value={formData.active}
              onChange={(e) =>
                setFormData({ ...formData, active: e.target.value === "true" })
              }
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </TextField>
          ) : (
            <Typography
              sx={{ color: formData.active ? "green" : "red", fontWeight: 500 }}
            >
              {formData.active ? "Active" : "Inactive"}
            </Typography>
          )}
          <IconButton
            size="small"
            color={editMode.status ? "success" : "primary"}
            onClick={() =>
              editMode.status
                ? setConfirmOpen(true)
                : setEditMode({ ...editMode, status: true })
            }
          >
            {editMode.status ? <SaveIcon /> : <EditIcon />}
          </IconButton>
          {editMode.status && (
            <IconButton
              size="small"
              color="error"
              onClick={() =>
                setEditMode({ ...editMode, status: false }) ||
                setFormData({ ...formData, active: account.active })
              }
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        {/* Group (not editable) */}
        {account.Group && (
          <Typography><b>Group:</b> {account.Group.group_name}</Typography>
        )}

        {/* Account Type (not editable) */}
        {account.AccountType && (
          <Typography><b>Account Type:</b> {account.AccountType.account_type}</Typography>
        )}

        {/* Description (editable) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <b>Description:</b>
          {editMode.description ? (
            <TextField
              size="small"
              fullWidth
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          ) : (
            <Typography>{formData.description || "-"}</Typography>
          )}
          <IconButton
            size="small"
            color={editMode.description ? "success" : "primary"}
            onClick={() =>
              editMode.description
                ? setConfirmOpen(true)
                : setEditMode({ ...editMode, description: true })
            }
          >
            {editMode.description ? <SaveIcon /> : <EditIcon />}
          </IconButton>
          {editMode.description && (
            <IconButton
              size="small"
              color="error"
              onClick={() =>
                setEditMode({ ...editMode, description: false }) ||
                setFormData({ ...formData, description: account.description })
              }
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        {/* Sub Companies */}
        {account.CoaAssignedSubCompanies?.length > 0 && (
          <>
            <Typography><b>Sub Companies:</b></Typography>
            {account.CoaAssignedSubCompanies.map((sub) => (
              <Typography key={sub.id} sx={{ ml: 2 }}>
                - {sub.SubCompany?.sub_company_name}
              </Typography>
            ))}
          </>
        )}
      </Box>

      {/* Footer */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button variant="contained" color="error" onClick={onClose}>
          Close
        </Button>
      </Box>

      {/* Confirm Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to save changes?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AccountEditsComponent;
