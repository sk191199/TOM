import React from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  useMediaQuery
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import EditIcon from '@mui/icons-material/Edit'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import DeleteIcon from '@mui/icons-material/Delete'

const roles = [
  {
    id: 1,
    role: 'Manager',
    name: 'Sasi kumar',
    email: 'sasikumar@gmail.com',
    active: true,
    alerts: true,
  },
  {
    id: 2,
    role: 'Manager',
    name: 'Sasi kumar',
    email: 'sasikumar@gmail.com',
    active: true,
    alerts: true,
  },
  {
    id: 3,
    role: 'Manager',
    name: 'Sasi kumar',
    email: 'sasikumar@gmail.com',
    active: true,
    alerts: true,
  },
  {
    id: 4,
    role: 'Manager',
    name: 'Sasi kumar',
    email: 'sasikumar@gmail.com',
    active: true,
    alerts: true,
  },
]

const RoleMaster = () => {
  const isMobile = useMediaQuery('(max-width:600px)')
  const isTablet = useMediaQuery('(min-width:601px) and (max-width:900px)')
  const isLaptop = useMediaQuery('(min-width:901px) and (max-width:1200px)')

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, bgcolor: '#f4f7fb', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
        <PersonIcon color="primary" sx={{ fontSize: 24, mr: 1 }} />
        <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: 18, md: 22 } }}>
          Role Master
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Button
          variant="outlined"
          color="primary"
          sx={{
            mr: 1,
            minWidth: 80,
            textTransform: 'none',
            borderRadius: 2,
            fontSize: { xs: 13, sm: 14 }
          }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{
            minWidth: 80,
            textTransform: 'none',
            borderRadius: 2,
            fontSize: { xs: 13, sm: 14 }
          }}
          startIcon={<CloudUploadIcon />}
        >
          Save
        </Button>
      </Box>
      {/* Form */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, md: 2 },
          mb: 2,
          borderRadius: 2,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: { xs: 2, sm: 3 },
          }}
        >
          <TextField
            label="Role Name *"
            size="small"
            sx={{
              flex: '1 1 300px',
              minWidth: { xs: 120, sm: 200, md: 300 },
              maxWidth: 400
            }}
            fullWidth={isMobile}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Checkbox color="primary" defaultChecked />
            <Typography variant="body2" sx={{ fontSize: 16 }}>
              Active
            </Typography>
          </Box>
        </Box>
      </Paper>
      {/* Existing Roles Table */}
      <Paper
        elevation={0}
        sx={{
          p: 0,
          borderRadius: 2,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pb: 0, gap: 1 }}>
          <CloudUploadIcon color="primary" sx={{ fontSize: 26 }} />
          <Typography variant="subtitle1" fontWeight={600}>
            Existing Roles
          </Typography>
        </Box>
        <TableContainer sx={{ mt: 1, borderRadius: 2, overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f5f7fa' }}>
                <TableCell sx={{ fontSize: 14, fontWeight: 600 }}>Role</TableCell>
                <TableCell sx={{ fontSize: 14, fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontSize: 14, fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontSize: 14, fontWeight: 600 }}>Active</TableCell>
                <TableCell sx={{ fontSize: 14, fontWeight: 600 }}>Actions</TableCell>
                <TableCell sx={{ fontSize: 14, fontWeight: 600 }}>Alerts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell sx={{ fontSize: 14 }}>{row.role}</TableCell>
                  <TableCell sx={{ fontSize: 14 }}>{row.name}</TableCell>
                  <TableCell sx={{ fontSize: 14 }}>{row.email}</TableCell>
                  <TableCell>
                    <Checkbox checked={row.active} color="primary" size="small" />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <EditIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                    <IconButton color="primary">
                      <VpnKeyIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={row.alerts} color="primary" size="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default RoleMaster