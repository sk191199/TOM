import React, { useEffect } from 'react'
import { Box, IconButton, InputBase, Avatar, Typography, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import LsService, { storageKey } from '../services/localstorage'  // sasi off
import { useNavigate } from 'react-router-dom'

const SIDEBAR_WIDTH_EXPANDED = 220
const SIDEBAR_WIDTH_COLLAPSED = 60

const Navbar = ({ onMenuClick, sidebarOpen }) => {

  const isMobile = useMediaQuery('(max-width:768px)');

  const sidebarWidth = sidebarOpen ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED;

  const navigate = useNavigate();

  // sasi off from here
  const user = LsService.getItem(storageKey)

  useEffect(() => {
    // console.log(user);

    if (!user) {
      LsService.removeItem(storageKey);
      navigate("/");
    }
  }, [user, navigate]);
  // sasi till here

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: isMobile ? 0 : `${sidebarWidth}px`,
        width: isMobile ? '100vw' : `calc(100vw - ${sidebarWidth}px)`,
        height: 56,
        background: '#353e50',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 1, sm: 3 },
        justifyContent: 'space-between',
        zIndex: 1201,
        transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1)',
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
                {/* sasi off below line */}
                {user.payload.username}
                {/* sasi */}  
              </Typography>
              <Typography sx={{ fontSize: 11, opacity: 0.7, lineHeight: 1 }}>
                {/* sasi off below line */}
                {user.payload.email} 
                {/* sasi@gmail.com */}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar