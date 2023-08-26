import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { authActions } from 'redux/auth.slice';

const Navbar = () => {
  const authUser = useSelector(x => x.auth.user);
  const dispatch = useDispatch();
  const logout = () => dispatch(authActions.logout());

  if (!authUser) return null;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          My App
        </Typography>
        <NavLink
          to="/"
          exact="true"
          style={{ textDecoration: 'none', color: 'white', marginLeft: '20px' }}
        >
          Home
        </NavLink>
        <NavLink
          onClick={logout}
          style={{ textDecoration: 'none', color: 'white', marginLeft: 'auto' }}
        >
          Logout
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
