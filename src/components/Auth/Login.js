import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField, Paper, Typography, Container } from '@mui/material';

import { history } from 'helpers';
import { authActions } from 'redux/auth.slice';

const Login = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(x => x.auth.user);
  const authError = useSelector(x => x.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (authUser) history.navigate('/');
  }, [authUser]);

  const validateForm = () => {
    let valid = true;

    if (email.trim() === '') {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };


  const handleLogin = (e) => {
    e.preventDefault();

    if (validateForm()) {
      return dispatch(authActions.login({ email, password }));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ padding: 5 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          helperText={emailError}
          FormHelperTextProps={{ style: { color: 'red' } }}
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          helperText={passwordError}
          FormHelperTextProps={{ style: { color: 'red' } }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
        {authError &&
          <Typography gutterBottom color="red">
            {authError.message}
          </Typography>
        }
      </Paper>
    </Container>
  );
};

export default Login;
