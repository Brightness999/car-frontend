import React from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { history } from './helpers';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import './App.css';
import { Box } from '@mui/material';

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" exact="true" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/login" Component={Login} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
