import { Box } from '@mui/material';
import React from 'react';
import MenuAppBar from './AppBar';

const Layout = ({ children }) => {
  return (
    <Box>
      <MenuAppBar />
      {children}
    </Box>
  );
};

export default Layout;
