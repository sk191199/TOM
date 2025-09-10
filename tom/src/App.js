import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './layout/Login'
import Navbar from './layout/Navbar'
import Sidebar from './layout/Sidebar'
import Dashboard from './components/Dashboard/Dashboard'
// Import your submenu pages here
import UserMaster from './components/UserMaster/UserMaster'
// import RoleMaster from './pages/RoleMaster'
import RoleMaster from './components/RoleMaster/RoleMaster'
// ...import other submenu pages

import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import DocumentNumbering from './components/DocumentNumbering/DocumentNumbering'
import Alerts from './components/Alerts/Alerts'
import ChangePassword from './components/ChangePassword/ChangePassword'
import CompanyMaster from './components/CompanyDetails/CompanyMaster'
import PaymentTermMaster from './components/PaymentTermMaster/PaymentTermMaster'
import CurrencyMaster from './components/CurrencyMaster/CurrencyMaster'
import UomMaster from './components/UomMaster/UomMaster'
import FinancialYearMaster from './components/FinancialYearMaster/FinancialYearMaster'
import SubsidyCompanyMaster from './components/SubsidyCompanyMaster/SubsidyCompanyMaster'
import ProjectMaster from './components/ProjectMaster/ProjectMaster'
import CostCenterCreation from './components/CostCenterCreation/CostCenterCreation'
import AccountCreation from './components/AccountCreation/AccountCreation'

const SIDEBAR_WIDTH_EXPANDED = 220
const SIDEBAR_WIDTH_COLLAPSED = 60

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const isMobile = useMediaQuery('(max-width:768px)')
  const sidebarWidth = sidebarOpen ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED

  const handleSidebarToggle = () => setSidebarOpen((open) => !open)
  const handleSidebarClose = () => setSidebarOpen(false)

  return (
    <Router>
      <Box sx={{ minHeight: '100vh', width: '100%', overflowX: 'hidden', background: '#fff' }}>
        {isLoggedIn && (
          <>
            <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} onClose={handleSidebarClose} />
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
              <Navbar onMenuClick={handleSidebarToggle} sidebarOpen={sidebarOpen} />
            </Box>
          </>
        )}
        <Box
          sx={{
            marginLeft: isLoggedIn ? (isMobile ? 0 : `${sidebarWidth}px`) : 0,
            marginTop: isLoggedIn ? '56px' : 0,
            minHeight: isLoggedIn ? 'calc(100vh - 56px)' : '100vh',
            width: isLoggedIn
              ? isMobile
                ? '100vw'
                : `calc(100vw - ${sidebarWidth}px)`
              : '100vw',
            background: '#fff',
            transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1)',
            overflowX: 'auto',
          }}
        >
          <Routes>
            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard/> : <Navigate to="/login" />} />
            <Route path="/usermaster" element={isLoggedIn ? <UserMaster sidebarOpen={sidebarOpen} /> : <Navigate to="/login" />} />
            <Route path="/rolemaster" element={isLoggedIn ? <RoleMaster sidebarOpen={sidebarOpen} /> : <Navigate to="/login" />} />
            <Route path="/document-numbering" element={isLoggedIn ? <DocumentNumbering sidebarOpen={sidebarOpen}/> : <Navigate to="/login" />} />
            <Route path="/alerts" element={isLoggedIn ? <Alerts sidebarOpen={sidebarOpen}/> : <Navigate to="/login" />} />
            <Route path="/change-password" element={isLoggedIn ? <ChangePassword sidebarOpen={sidebarOpen}/> : <Navigate to="/login" />} />
            <Route path="/company-master" element={isLoggedIn ? <CompanyMaster sidebarOpen={sidebarOpen}/> : <Navigate to="/login" />} />
            <Route path="/payment-term-master" element={isLoggedIn ? <PaymentTermMaster sidebarOpen={sidebarOpen}/> : <Navigate to="/login" />} />
            <Route path="/currency-master" element={isLoggedIn ? <CurrencyMaster sidebarOpen={sidebarOpen}/> : <Navigate to="/login" />} />
            <Route path="/uom-master" element={isLoggedIn ? <UomMaster sidebarOpen={sidebarOpen}/> : <Navigate to="/login" />} />
            <Route path="/financial-year-master" element={isLoggedIn ? <FinancialYearMaster sidebarOpen={sidebarOpen}/> : <Navigate to="/login" />} />
            <Route path="/subsidy-company-master" element={isLoggedIn ? <SubsidyCompanyMaster sidebarOpen={sidebarOpen}/> : <Navigate to="/login" />} />
            <Route path="/project-master" element={isLoggedIn ? <ProjectMaster sidebarOpen={sidebarOpen}/> : <Navigate to="/login" />} />
            <Route path="/cost-center-creation" element={isLoggedIn ? <CostCenterCreation sidebarOpen={sidebarOpen}/>: <Navigate to="/login" />} />
            <Route path="/account-creation" element={isLoggedIn ? <AccountCreation sidebarOpen={sidebarOpen}/>: <Navigate to="/login" />} />


           
           
            
            {/* Add other submenu routes here */}
            <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  )
}

export default App
