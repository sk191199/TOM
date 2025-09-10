import React from 'react'
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  useMediaQuery
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SaveIcon from '@mui/icons-material/Save'
import DescriptionIcon from '@mui/icons-material/Description'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const rows = [
  { type: 'Input', value: 'ABC', start: 0, length: 3 },
  { type: 'Character input', value: '/', start: 0, length: 1 },
  { type: 'Date', value: 'Year', start: 0, length: 4 },
  { type: 'Increment', value: '/001', start: 0, length: 3 },
  { type: 'Date', value: 'Year', start: 0, length: 4 },
]

const DocumentNumbering = () => {
  const isMobile = useMediaQuery('(max-width:600px)')
  const isTablet = useMediaQuery('(min-width:601px) and (max-width:900px)')
  const isLaptop = useMediaQuery('(min-width:901px) and (max-width:1200px)')

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, bgcolor: '#f4f7fb', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        gap: 1,
        flexWrap: 'wrap'
      }}>
        <DescriptionIcon color="primary" sx={{ fontSize: 24, mr: 1 }} />
        <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: 18, md: 20 } }}>
          Document Numbering
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
          startIcon={<DeleteOutlineIcon />}
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
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Box>
      {/* Table */}
      <Paper
        elevation={0}
        sx={{
          mt: 2,
          borderRadius: 2,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          p: 0,
        }}
      >
        <TableContainer sx={{ borderRadius: 2, overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f5f7fa' }}>
                <TableCell sx={{ fontWeight: 600, fontSize: 14, width: 180, textAlign:"left" }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 14, textAlign:"center" }}>Field /Value</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 14 , textAlign:"center"}}>Starting Character</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 14, textAlign:"center" }}>Number of characters</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell sx={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 1, textAlign:"center" }}>
                    <IconButton size="small" sx={{ p: 0.5 }}>
                      <KeyboardArrowDownIcon fontSize="small" sx={{ color: '#888' }} />
                    </IconButton>
                    {row.type}
                  </TableCell>
                  <TableCell sx={{ fontSize: 14, textAlign:"center" }}>{row.value}</TableCell>
                  <TableCell sx={{ fontSize: 14 , textAlign:"center"}}>{row.start}</TableCell>
                  <TableCell sx={{ fontSize: 14 ,textAlign:"center"}}>{row.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default DocumentNumbering