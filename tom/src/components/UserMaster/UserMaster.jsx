import React from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  Tooltip,
  useMediaQuery
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SaveIcon from '@mui/icons-material/Save'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CancelIcon from '@mui/icons-material/Cancel'
import PersonIcon from '@mui/icons-material/Person'

const users = [
  {
    id: 1,
    userId: 'Manager',
    userName: 'Sasi kumar',
    email: 'sasikumar@gmail.com',
    role: 'Manager',
    company: 'Tom-Erp',
    active: true,
    read: true,
    edit: false,
    delete: false,
    alerts: true,
  },
  {
    id: 1,
    userId: 'Manager',
    userName: 'Sasi kumar',
    email: 'sasikumar@gmail.com',
    role: 'Manager',
    company: 'Tom-Erp',
    active: true,
    read: true,
    edit: false,
    delete: false,
    alerts: true,
  },
  {
    id: 1,
    userId: 'Manager',
    userName: 'Sasi kumar',
    email: 'sasikumar@gmail.com',
    role: 'Manager',
    company: 'Tom-Erp',
    active: true,
    read: true,
    edit: false,
    delete: false,
    alerts: true,
  },
  {
    id: 1,
    userId: 'Manager',
    userName: 'Sasi kumar',
    email: 'sasikumar@gmail.com',
    role: 'Manager',
    company: 'Tom-Erp',
    active: true,
    read: true,
    edit: false,
    delete: false,
    alerts: true,
  },
  {
    id: 1,
    userId: 'Manager',
    userName: 'Sasi kumar',
    email: 'sasikumar@gmail.com',
    role: 'Manager',
    company: 'Tom-Erp',
    active: true,
    read: true,
    edit: false,
    delete: false,
    alerts: true,
  },
  {
    id: 1,
    userId: 'Manager',
    userName: 'Sasi kumar',
    email: 'sasikumar@gmail.com',
    role: 'Manager',
    company: 'Tom-Erp',
    active: true,
    read: true,
    edit: false,
    delete: false,
    alerts: true,
  },
  {
    id: 1,
    userId: 'Manager',
    userName: 'Sasi kumar',
    email: 'sasikumar@gmail.com',
    role: 'Manager',
    company: 'Tom-Erp',
    active: true,
    read: true,
    edit: false,
    delete: false,
    alerts: true,
  },
  {
    id: 1,
    userId: 'Manager',
    userName: 'Sasi kumar',
    email: 'sasikumar@gmail.com',
    role: 'Manager',
    company: 'Tom-Erp',
    active: true,
    read: true,
    edit: false,
    delete: false,
    alerts: true,
  },
  // ...repeat as needed
]

const roles = ['Manager', 'Admin', 'User']

const SIDEBAR_WIDTH_EXPANDED = 220
const SIDEBAR_WIDTH_COLLAPSED = 60

const UserMaster = ({ sidebarOpen }) => {
  const isMobile = useMediaQuery('(max-width:900px)')
  const sidebarWidth = sidebarOpen ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED

  return (
    <Box
      sx={{
        p: { xs: 1, md: 3 },
        bgcolor: '#f7f9fb',
        minHeight: '100vh',
        width: { xs: '100vw', md: `calc(100vw - ${sidebarWidth}px)` },
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
        <PersonIcon color="primary" sx={{ fontSize: 24, mr: 1 }} />
        <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: 18, md: 22 } }}>
          User Creation
        </Typography>
      </Box>
      {/* Form */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1, md: 2 },
          mb: 2,
          borderRadius: 3,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        {/* Form Row 1 */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mb: 2,
            alignItems: 'center',
          }}
        >
          <TextField label="User ID" size="small" sx={{ flex: '1 1 160px', maxWidth: 200 }} />
          <TextField label="Password" size="small" type="password" sx={{ flex: '1 1 160px', maxWidth: 200 }} />
          <TextField label="User Name" size="small" sx={{ flex: '1 1 160px', maxWidth: 200 }} />
          <TextField label="Email" size="small" sx={{ flex: '1 1 160px', maxWidth: 200 }} />
          <Select
            displayEmpty
            size="small"
            defaultValue=""
            sx={{ flex: '1 1 120px', maxWidth: 160, minWidth: 100 }}
            renderValue={selected => selected || 'Role'}
          >
            <MenuItem value="" disabled>
              Role
            </MenuItem>
            {roles.map(role => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </Box>
        {/* Form Row 2 */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon sx={{ fontSize: 18 }} />}
            sx={{
              flex: '1 1 160px',
              maxWidth: 200,
              fontSize: 13,
              height: 40,
              textTransform: 'none'
            }}
          >
            Upload Photo
            <input type="file" hidden />
          </Button>
          <Select
            displayEmpty
            size="small"
            defaultValue=""
            sx={{ flex: '1 1 160px', maxWidth: 200, fontSize: 13, height: 40 }}
            renderValue={selected => selected || 'Company Database'}
          >
            <MenuItem value="" disabled>
              Company Database
            </MenuItem>
            <MenuItem value="Tom-Erp">Tom-Erp</MenuItem>
            <MenuItem value="Tom-Cloud">Tom-Cloud</MenuItem>
          </Select>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', ml: 1 }}>
            <FormCheckbox label="Read" />
            <FormCheckbox label="Edit" />
            <FormCheckbox label="Delete" />
            <FormCheckbox label="Active" />
          </Box>
        </Box>
        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mt: 1,
            justifyContent: { xs: 'flex-start', md: 'flex-end' }
          }}
        >
          <Button variant="outlined" color="inherit" startIcon={<CancelIcon sx={{ fontSize: 18 }} />} sx={{ fontSize: 13, px: 2, minWidth: 90, height: 38 }}>
            Cancel
          </Button>
          <Button variant="outlined" color="primary" startIcon={<SaveIcon sx={{ fontSize: 18 }} />} sx={{ fontSize: 13, px: 2, minWidth: 110, height: 38 }}>
            Save Draft
          </Button>
          <Button variant="outlined" color="info" startIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />} sx={{ fontSize: 13, px: 2, minWidth: 150, height: 38 }}>
            Convert to Order
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ minWidth: 90, fontWeight: 600, fontSize: 13, px: 2, height: 38 }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
      {/* User Table */}
      <Paper
        sx={{
          borderRadius: 3,
          overflowX: 'auto',
          width: '100%',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        <Box sx={{ minWidth: 1100, width: '100%' }}>
          <TableContainer sx={{ width: '100%' }}>
            <Table size="small" sx={{ width: '100%' }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f7fa' }}>
                  <TableCell sx={{ fontSize: 13 }}>User id</TableCell>
                  <TableCell sx={{ fontSize: 13 }}>User Name</TableCell>
                  <TableCell sx={{ fontSize: 13 }}>Email ID</TableCell>
                  <TableCell sx={{ fontSize: 13 }}>Role</TableCell>
                  <TableCell sx={{ fontSize: 13 }}>Company DB</TableCell>
                  <TableCell sx={{ fontSize: 13 }}>Active</TableCell>
                  <TableCell sx={{ fontSize: 13 }}>Read</TableCell>
                  <TableCell sx={{ fontSize: 13 }}>Edit</TableCell>
                  <TableCell sx={{ fontSize: 13 }}>Delete</TableCell>
                  <TableCell sx={{ fontSize: 13 }}>Actions</TableCell>
                  <TableCell sx={{ fontSize: 13 }}>Alerts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(row => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ fontSize: 13 }}>{row.userId}</TableCell>
                    <TableCell sx={{ fontSize: 13 }}>{row.userName}</TableCell>
                    <TableCell sx={{ fontSize: 13 }}>{row.email}</TableCell>
                    <TableCell sx={{ fontSize: 13 }}>{row.role}</TableCell>
                    <TableCell sx={{ fontSize: 13 }}>{row.company}</TableCell>
                    <TableCell>
                      <Checkbox checked={row.active} color="primary" size="small" />
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={row.read} color="primary" size="small" />
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={row.edit} color="primary" size="small" />
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={row.delete} color="primary" size="small" />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton size="small" color="primary">
                          <SaveIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={row.alerts} color="primary" size="small" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  )
}

// Helper for labeled checkbox
function FormCheckbox({ label }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Checkbox size="small" color="primary" />
      <Typography variant="body2" sx={{ fontSize: 13 }}>{label}</Typography>
    </Box>
  )
}

export default UserMaster