import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemButton, ListItemText, useTheme, useMediaQuery, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { label: 'Browse All Dishes', icon: <RestaurantMenuIcon />, path: '/dishes' },
  // Add more links here if needed in the future
];

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    navigate(path);
    setDrawerOpen(false); // Close drawer after navigation
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: '100%',
        overflowX: 'hidden',
      }}
      role="presentation"
    >
      <Toolbar />
      <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
        {navLinks.map((nav) => (
          <ListItem key={nav.label} disablePadding>
            <ListItemButton onClick={() => handleNav(nav.path)}>
              <ListItemIcon sx={{ minWidth: 40, color: theme.palette.action.active }}>{nav.icon}</ListItemIcon>
              <ListItemText 
                primary={nav.label} 
                sx={{ 
                  color: theme.palette.text.primary,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: theme.palette.mode === 'light'
          ? 'rgba(255,255,255,0.85)'
          : 'rgba(24,24,24,0.85)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)',
        borderBottom: `1.5px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 72 } }}>
        {/* Logo/Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: 'primary.main',
            flexGrow: 1,
            cursor: 'pointer',
            userSelect: 'none',
            textShadow: theme.palette.mode === 'dark' ? '0 2px 8px #1118' : '0 2px 8px #fff8',
          }}
          onClick={() => navigate('/')}
        >
          Gourmet and Gormand
        </Typography>

        {/* Navigation */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(!drawerOpen)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            // Desktop Navigation
            navLinks.map((nav) => (
              <Button
                key={nav.label}
                startIcon={nav.icon}
                onClick={() => handleNav(nav.path)}
                color={location.pathname === nav.path ? 'primary' : 'inherit'}
                sx={{
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 2,
                  textTransform: 'none',
                  bgcolor: location.pathname === nav.path ? 'primary.light' : 'transparent',
                  color: theme => theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined,
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  minWidth: { xs: 0, sm: 120 },
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                {nav.label}
              </Button>
            ))
          )}
          <ThemeToggle />
        </Box>
      </Toolbar>
      {isMobile && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              background: theme.palette.mode === 'light'
                ? 'rgba(255,255,255,0.85)'
                : 'rgba(24,24,24,0.85)',
              backdropFilter: 'blur(10px)',
              width: 250,
              borderLeft: `1.5px solid ${theme.palette.divider}`,
              paddingTop: 'env(safe-area-inset-top)',
            }
          }}
          sx={{ zIndex: theme.zIndex.drawer - 1 }}
        >
          {drawerContent}
        </Drawer>
      )}
    </AppBar>
  );
}; 