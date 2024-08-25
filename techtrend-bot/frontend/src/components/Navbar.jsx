// src/components/NavBar.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { logout } from '../store/slices/authSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TechTrendBot
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          <Button color="inherit" component={RouterLink} to="/trends">Trends</Button>
          {user ? (
            <>
              <Button color="inherit" component={RouterLink} to="/chat">Chat</Button>
              <Button color="inherit" component={RouterLink} to="/profile">Profile</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">Login</Button>
              <Button color="inherit" component={RouterLink} to="/register">Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;