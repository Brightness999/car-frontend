import React from 'react';
import { Paper, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="caption">&copy; {new Date().getFullYear()} My App</Typography>
    </Paper>
  );
};

export default Footer;
