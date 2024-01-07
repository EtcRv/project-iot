import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import { ClickAwayListener, Popper } from '@mui/material';
import { LocalFireDepartment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateAccessToken, updateUser } from '../../redux/userSlice';
import { SuccessNotification } from '../../components/Notification';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    navigate('/login');
    setAnchorEl(null);
    dispatch(updateAccessToken(''));
    dispatch(updateUser({}));
    SuccessNotification('Success', 'Logout Success');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            sx={{ cursor: 'pointer' }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
              onClick={() => navigate('/')}
            >
              <LocalFireDepartment />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Tracking Fire App
              </Typography>
            </Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {anchorEl && (
        <ClickAwayListener onClickAway={handleClose}>
          <Popper
            id="menu-appbar"
            anchorEl={anchorEl}
            placement="bottom-end"
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Popper>
        </ClickAwayListener>
      )}
    </Box>
  );
}
