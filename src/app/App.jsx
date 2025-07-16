import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import AppRoutes from '../routes/route';

const drawerWidth = 240;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); // ← PC用Drawer表示切替

  const handleToggleMobileDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCloseSidebar = () => {
    setMobileOpen(false);
    setShowSidebar(false);
  };

  const handleOpenSidebar = () => {
    setShowSidebar(true);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Topbar onMenuClick={handleToggleMobileDrawer} drawerWidth={drawerWidth} showSidebar={showSidebar} onOpenSidebar={handleOpenSidebar} />
      {showSidebar && (
        <Sidebar
          open={mobileOpen}
          onClose={handleCloseSidebar}
          drawerWidth={drawerWidth}
          onClosePermanent={handleCloseSidebar}
        />
      )}
  
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: showSidebar ? `calc(100% - ${drawerWidth}px)` : '100%' } }}>
        <Toolbar />
        <AppRoutes />
      </Box>
    </Box>
  );
}

export default App;
