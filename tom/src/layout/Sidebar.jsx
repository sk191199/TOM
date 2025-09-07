import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StoreIcon from '@mui/icons-material/Store';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InventoryIcon from '@mui/icons-material/Inventory';
import BuildIcon from '@mui/icons-material/Build';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const SIDEBAR_WIDTH_EXPANDED = 220;
const SIDEBAR_WIDTH_COLLAPSED = 60;

const menuItems = [
  { label: 'Administration', icon: <HomeIcon /> },
  { label: 'Master', icon: <AssignmentIndIcon /> },
  { label: 'Customer', icon: <PeopleAltIcon /> },
  { label: 'Vendor', icon: <StoreIcon /> },
  { label: 'Sales', icon: <PointOfSaleIcon /> },
  { label: 'Purchase', icon: <SettingsIcon /> },
  { label: 'Cash and bank', icon: <AccountBalanceWalletIcon /> },
  { label: 'Journals', icon: <ShoppingCartIcon /> },
  { label: 'Accounting', icon: <AccountBalanceIcon /> },
  { label: 'Inventory', icon: <InventoryIcon /> },
  { label: 'Production', icon: <BuildIcon /> },
  { label: 'CRM', icon: <ShoppingBagIcon /> },
  { label: 'Payroll', icon: <BusinessCenterIcon /> },
];

const Sidebar = ({ open, onClose }) => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const sidebarWidth = open ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED;

  // Sidebar content
  const sidebarContent = (
    <Box
      sx={{
        width: sidebarWidth,
        minWidth: sidebarWidth,
        maxWidth: sidebarWidth,
        bgcolor: '#353e50',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: open ? 'flex-start' : 'center',
        transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1300,
        boxShadow: 2,
        overflow: 'hidden',
      }}
    >
      {/* TOM Logo */}
      <Box
        component="img"
        src="https://www.tom.sg/wp-content/uploads/2021/11/tom_logo-300x135.png"
        alt="TOM Logo"
        sx={{
          width: open ? 120 : 40,
          height: open ? 54 : 44,
          mx: 'auto',
          my: 2,
          display: 'block',
          transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
          flexShrink: 0,
        }}
      />
      {/* Scrollable Menu Items */}
      <Box
        sx={{
          flex: 1,
          width: '100%',
          minWidth: sidebarWidth,
          maxWidth: sidebarWidth,
          overflowY: 'auto',
          pb: 2,
          // Custom scrollbar styles
          '&::-webkit-scrollbar': {
            width: '2px',
            backgroundColor: '#353e50',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#4a5568', // slightly lighter for visibility
            borderRadius: '2px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#353e50',
          },
          scrollbarWidth: 'thin', // Firefox
          scrollbarColor: '#4a5568 #353e50', // Firefox
        }}
      >
        <List sx={{ width: '100%', pt: 0 }}>
          {menuItems.map((item) => (
            <Tooltip
              key={item.label}
              title={!open ? item.label : ''}
              placement="right"
              arrow
            >
              <ListItem
                button
                sx={{
                  color: 'white',
                  px: open ? 2 : 1,
                  py: 0.5,
                  minHeight: 40,
                  '&:hover': { bgcolor: '#2d3441' },
                  borderRadius: 1,
                  width: '100%',
                  mx: 0,
                  mb: 0.5,
                  justifyContent: open ? 'flex-start' : 'center',
                  cursor: 'pointer',
                  transition: 'padding 0.3s cubic-bezier(0.4,0,0.2,1), justify-content 0.3s cubic-bezier(0.4,0,0.2,1)',
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 0, mr: open ? 2 : 0, justifyContent: 'center', cursor: 'pointer' }}>
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <>
                    <ListItemText primary={item.label} sx={{ '.MuiTypography-root': { fontSize: 15 } }} />
                    <ChevronRightIcon sx={{ fontSize: 18, color: '#fff', ml: 'auto' }} />
                  </>
                )}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>
    </Box>
  );

  // Mobile: use Drawer, Desktop: fixed sidebar
  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: SIDEBAR_WIDTH_EXPANDED,
            bgcolor: '#353e50',
          }
        }}
      >
        {/* Always expanded in mobile drawer */}
        <Box
          sx={{
            width: SIDEBAR_WIDTH_EXPANDED,
            minWidth: SIDEBAR_WIDTH_EXPANDED,
            maxWidth: SIDEBAR_WIDTH_EXPANDED,
            bgcolor: '#353e50',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            borderRight: '2px solid #e0e0e0',
          }}
        >
          <Box
            component="img"
            src="https://www.tom.sg/wp-content/uploads/2021/11/tom_logo-300x135.png"
            alt="TOM Logo"
            sx={{ width: 120, mx: 'auto', my: 2, display: 'block', flexShrink: 0 }}
          />
          <Box sx={{
            flex: 1,
            width: '100%',
            minWidth: SIDEBAR_WIDTH_EXPANDED,
            maxWidth: SIDEBAR_WIDTH_EXPANDED,
            overflowY: 'auto',
            pb: 2,
          }}>
            <List sx={{ width: '100%', pt: 0 }}>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.label}
                  sx={{
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    minHeight: 40,
                    '&:hover': { bgcolor: '#2d3441' },
                    borderRadius: 1,
                    width: '100%',
                    mx: 0,
                    mb: 0.5,
                    cursor: 'pointer',
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: 0, mr: 2, justifyContent: 'center', cursor: 'pointer' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} sx={{ '.MuiTypography-root': { fontSize: 15 } }} />
                  <ChevronRightIcon sx={{ fontSize: 18, color: '#fff', ml: 'auto' }} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
    );
  }

  // Desktop sidebar
  return sidebarContent;
};

export default Sidebar;