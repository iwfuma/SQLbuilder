import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Topbar = ({ onMenuClick, drawerWidth, showSidebar, onOpenSidebar }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: showSidebar ? `calc(100% - ${drawerWidth}px)` : '100%' },
          ml: { sm: showSidebar ? `${drawerWidth}px` : 0 },
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={showSidebar ? onMenuClick : onOpenSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            SQLBuilder
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Topbar;
