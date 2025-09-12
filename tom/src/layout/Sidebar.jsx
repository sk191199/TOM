import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Drawer, Tooltip, useMediaQuery } from '@mui/material';
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
import { useNavigate } from 'react-router-dom';
import tomLogo from "../data/images/TOM-logo.png";

const SIDEBAR_WIDTH_EXPANDED = 220;
const SIDEBAR_WIDTH_COLLAPSED = 60;

// Submenu for Administration
const administrationSubmenu = ['User Master', 'Role Master', 'Document Numbering', 'Alerts', 'Change Password', 'Company Master'];

// Example submenus for other menu items (customize as needed)
const masterSubmenu = ['Payment term Master', 'Currency Master', 'UOM Master', "Finacial Year Master", "Subsidy Company Master", "Project Master", "Cost Center Creation"];
const customerSubmenu = ['Customer List', 'Vendor List'];
const salesSubmenu = ['Sales Quotation', 'Sales Order', "AR Invoice"];
const purchaseSubmenu = ['Purchase Order', 'Purchase Invoice'];
const cashBankSubmenu = ['Cash Entry', 'Bank Entry'];
const journalsSubmenu = ['Journal Entry'];
const accountingSubmenu = ["Account Lists"];
// , "Chart of Accounts"
const inventorySubmenu = ['Stock List', 'Stock Movement'];
const productionSubmenu = ['Production Order'];
const crmSubmenu = ['Leads', 'Opportunities'];
const payrollSubmenu = ['Employee List', 'Salary Slip'];

// Menu items with submenu arrays
const menuItems = [
  { label: 'Administration', icon: <HomeIcon />, submenu: administrationSubmenu },
  { label: 'Master', icon: <AssignmentIndIcon />, submenu: masterSubmenu },
  { label: 'Customer', icon: <PeopleAltIcon />, submenu: customerSubmenu },
  { label: 'Vendor', icon: <StoreIcon />, submenu: customerSubmenu },
  { label: 'Sales', icon: <PointOfSaleIcon />, submenu: salesSubmenu },
  { label: 'Purchase', icon: <SettingsIcon />, submenu: purchaseSubmenu },
  { label: 'Cash and bank', icon: <AccountBalanceWalletIcon />, submenu: cashBankSubmenu },
  { label: 'Journals', icon: <ShoppingCartIcon />, submenu: journalsSubmenu },
  { label: 'Accounting', icon: <AccountBalanceIcon />, submenu: accountingSubmenu },
  { label: 'Inventory', icon: <InventoryIcon />, submenu: inventorySubmenu },
  { label: 'Production', icon: <BuildIcon />, submenu: productionSubmenu },
  { label: 'CRM', icon: <ShoppingBagIcon />, submenu: crmSubmenu },
  { label: 'Payroll', icon: <BusinessCenterIcon />, submenu: payrollSubmenu },
];

const submenuLinks = {
  //adminstration
  'User Master': '/usermaster',
  'Role Master': '/rolemaster',
  'Document Numbering': '/document-numbering',
  "Alerts": "/alerts",
  'Change Password': "/change-password",
  "Company Master": "/company-master",

  //master
  'Payment term Master': '/payment-term-master',
  'Currency Master': '/currency-master',
  'UOM Master': '/uom-master',
  "Finacial Year Master": '/financial-year-master',
  "Subsidy Company Master": '/subsidy-company-master',
  "Project Master": '/project-master',
  "Cost Center Creation": '/cost-center-creation',

  // accounting
  "Account Lists": '/account-list',
  // "Chart of Accounts": '/chart-of-accounts',

  // ...add other submenu label-to-path mappings
  //sales
  'Sales Quotation': '/sales-quotation',
  'Sales Order': '/sales-order',
  "AR Invoice": '/ar-invoice',

};

const Sidebar = ({ open, onClose }) => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const sidebarWidth = open ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED;
  const navigate = useNavigate();

  // State to track which submenu is open (by index)
  const [submenuOpen, setSubmenuOpen] = useState(null);
  // State to track submenu anchor position for floating submenu
  const [submenuAnchor, setSubmenuAnchor] = useState({ top: 0, left: 0 });

  // Helper to open submenu on click (desktop and mobile)
  const handleMenuClick = (idx, e) => {
    if (submenuOpen === idx) {
      setSubmenuOpen(null);
    } else {
      // For both desktop and mobile, position submenu to the right of the menu item
      const rect = e.currentTarget.getBoundingClientRect();
      setSubmenuAnchor({
        top: rect.top,
        left: rect.right,
        width: rect.width,
        height: rect.height
      });
      setSubmenuOpen(idx);
    }
  };

  // Sidebar content for desktop
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
        // src="https://www.tom.sg/wp-content/uploads/2021/11/tom_logo-300x135.png"
        src={tomLogo}
        alt="TOM Logo"
        sx={{
          width: open ? 120 : 40,
          // height: open ? 54 : 25,
          mx: 'auto',
          my: 2,
          display: 'block',
          transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
          flexShrink: 0,
          cursor:"pointer"
        }}
        onClick={()=>navigate('/dashboard')}
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
            backgroundColor: '#4a5568',
            borderRadius: '2px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#353e50',
          },
          scrollbarWidth: 'thin',
          scrollbarColor: '#4a5568 #353e50',
        }}
      >
        <List sx={{ width: '100%', pt: 0 }}>
          {menuItems.map((item, idx) => (
            <Tooltip
              key={item.label}
              title={!open ? item.label : ''}
              placement="right"
              arrow
            >
              <ListItem
                // button
                onClick={e => item.submenu && handleMenuClick(idx, e)}
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
                  position: 'relative',
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 0, mr: open ? 2 : 0, justifyContent: 'center', cursor: 'pointer' }}>
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <>
                    <ListItemText primary={item.label} sx={{ '.MuiTypography-root': { fontSize: 15 } }} />
                    {item.submenu && <ChevronRightIcon sx={{ fontSize: 18, color: '#fff', ml: 'auto' }} />}
                  </>
                )}
                {/* Submenu: right-side floating box, always opens on click */}
                {submenuOpen === idx && item.submenu && (() => {
                  // Calculate submenu position to prevent overflow
                  const submenuHeight = item.submenu.length * 48 + 32; // 48px per item + 32px padding
                  const viewportHeight = window.innerHeight;
                  let top = submenuAnchor.top;
                  if (top + submenuHeight > viewportHeight) {
                    top = Math.max(8, viewportHeight - submenuHeight - 8); // 8px margin from bottom
                  }
                  return (
                    <Box
                      onMouseLeave={() => setSubmenuOpen(null)}
                      sx={{
                        position: 'fixed',
                        top,
                        left: submenuAnchor.left + 12,
                        bgcolor: '#3a4354',
                        minWidth: 160,
                        maxWidth: 200,
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        boxShadow: 4,
                        borderRadius: 2,
                        py: 2,
                        zIndex: 2000,
                      }}
                    >
                      {item.submenu.map((sub, subIdx) => (
                        <Box
                          key={sub}
                          sx={{
                            px: 3,
                            py: 1.2,
                            color: 'white',
                            fontSize: 16,
                            cursor: 'pointer',
                            '&:hover': { bgcolor: '#2d3441' },
                            whiteSpace: 'normal',
                          }}
                          onClick={() => {
                            setSubmenuOpen(null);
                            if (submenuLinks[sub]) navigate(submenuLinks[sub]);
                          }}
                        >
                          {sub}
                        </Box>
                      ))}
                    </Box>
                  );
                })()}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>
    </Box>
  );

  // Mobile: use Drawer, show submenu as right-side floating box with margin
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
            // borderRight: '2px solid #e0e0e0',
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
              {menuItems.map((item, idx) => (
                <React.Fragment key={item.label}>
                  <ListItem
                    button
                    onClick={() => setSubmenuOpen(submenuOpen === idx ? null : idx)}
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
                    <ListItemText primary={item.label} sx={{ '.MuiTypography-root': { fontSize: 14 } }} />
                    {item.submenu && <ChevronRightIcon sx={{ fontSize: 16, color: '#fff', ml: 'auto' }} />}
                  </ListItem>
                  {/* Submenu: open below the menu item on mobile */}
                  {submenuOpen === idx && item.submenu && (
                    <Box
                      sx={{
                        bgcolor: '#3a4354',
                        borderRadius: 2,
                        mt: 1,
                        mb: 1,
                        ml: 2,
                        boxShadow: 2,
                      }}
                    >
                      {item.submenu.map((sub, subIdx) => (
                        <Box
                          key={sub}
                          sx={{
                            px: 3,
                            py: 1.2,
                            color: 'white',
                            fontSize: 14,
                            cursor: 'pointer',
                            '&:hover': { bgcolor: '#2d3441' },
                          }}
                          onClick={() => {
                            setSubmenuOpen(null);
                            if (submenuLinks[sub]) navigate(submenuLinks[sub]);
                            onClose();
                          }}
                        >
                          {sub}
                        </Box>
                      ))}
                    </Box>
                  )}
                </React.Fragment>
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