import React, { useState } from 'react'
import './App.css'
import Login from './layout/Login'
import Navbar from './layout/Navbar'
import Sidebar from './layout/Sidebar'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

const SIDEBAR_WIDTH_EXPANDED = 220
const SIDEBAR_WIDTH_COLLAPSED = 60

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width:768px)')
  const sidebarWidth = sidebarOpen ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED

  const handleSidebarToggle = () => setSidebarOpen((open) => !open)
  const handleSidebarClose = () => setSidebarOpen(false)

  return (
    <Box sx={{ minHeight: '100vh', background: '#fff', width: '100vw', overflowX: 'hidden' }}>
      {/* Sidebar: only fixed on desktop */}
      <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} onClose={handleSidebarClose} />
      {/* Navbar: full width on mobile, shifted on desktop */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: isMobile ? 0 : sidebarWidth,
          right: 0,
          zIndex: 1200,
          transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <Navbar onMenuClick={handleSidebarToggle} />
      </Box>
      {/* Main Content: full width on mobile, shifted on desktop */}
      <Box
        sx={{
          marginLeft: isMobile ? 0 : `${sidebarWidth}px`,
          marginTop: '56px', // navbar height
          p: 2,
          minHeight: 'calc(100vh - 56px)',
          background: '#fff',
          transition: 'margin-left 0.5s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* <Login/> */}
        {/* Your main content here */}
      </Box>
    </Box>
  )
}

export default App
