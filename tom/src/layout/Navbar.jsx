import React from 'react'
import { Box, IconButton, InputBase, Avatar, Typography, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

const Navbar = ({ onMenuClick }) => {
  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <Box
      sx={{
        width: '100vw', // Always full viewport width
        height: 56,
        background: '#353e50',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 1, sm: 3 },
        justifyContent: 'space-between',
        marginLeft: 0,
        position: isMobile ? 'fixed' : 'static',
        top: isMobile ? 0 : 'auto',
        left: isMobile ? 0 : 'auto',
        right: isMobile ? 0 : 'auto',
        zIndex: 1201,
      }}
    >
      {/* Left: Menu Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton sx={{ color: 'white', mr: 1 }} onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        {/* Search Bar */}
        <Box
          sx={{
            background: 'white',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            pl: 1,
            width: isMobile ? 140 : 350,
            height: 36,
            boxShadow: 1,
          }}
        >
          <SearchIcon sx={{ color: '#b0b0b0', mr: 1 }} />
          <InputBase
            placeholder="Search for anything..."
            sx={{
              flex: 1,
              fontSize: 15,
              color: '#353e50',
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>
      </Box>
      {/* Right: Icons and Profile */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
        <IconButton sx={{ color: 'white' }}>
          <HomeIcon />
        </IconButton>
        <IconButton sx={{ color: 'white' }}>
          <NotificationsNoneIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
          <Avatar
            src="https://randomuser.me/api/portraits/men/32.jpg"
            sx={{ width: 32, height: 32, mr: 1 }}
          />
          {!isMobile && (
            <Box sx={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
              <Typography sx={{ fontSize: 13, fontWeight: 500, lineHeight: 1 }}>
                Amina Agarwal
              </Typography>
              <Typography sx={{ fontSize: 11, opacity: 0.7, lineHeight: 1 }}>
                UI, India
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar