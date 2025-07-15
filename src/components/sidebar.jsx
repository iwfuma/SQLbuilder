import React from 'react';
import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';  // ← 追加

const Sidebar = ({ open, onClose, drawerWidth, onClosePermanent }) => {
  const menuItems = [
    { text: 'テーブル作成', icon: <InboxIcon />, path: '/' },
    { text: 'INSERT作成', icon: <MailIcon />, path: '/insert' },
    { text: '履歴', icon: <MailIcon />, path: '/history' },
  ];

  const drawerContent = (showClose) => (
    <div>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
        <Typography variant="h6">メニュー</Typography>
        {showClose && (
          <IconButton onClick={onClosePermanent || onClose} aria-label="閉じる">
            <CloseIcon />
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={onClose} // モバイル時にメニュー選択後Drawerを閉じる
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="sidebar"
    >
      {/* モバイル用 Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent(true)}
      </Drawer>

      {/* PC用 Drawer（permanent） */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent(true)}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
