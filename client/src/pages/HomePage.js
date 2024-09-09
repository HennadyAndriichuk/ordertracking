import React, { useState, useEffect } from 'react';
import TrackingStatus from '../components/homePage/trackingStatus';
import { Link } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import { jwtDecode } from 'jwt-decode';
import SetDateRange from '../components/setDateRange';

const HomePage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(''); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId);
        setUsername(decoded.username); 
      } catch (error) {
        console.error('Invalid token');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleShowRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleLoginSuccess = (id, username) => {
    setUserId(id);
    setUsername(username); 
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserId(null);
    setUsername(''); 
  };

  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center">
          <Typography variant="h4" component="h1" mr={2}>
            Заказы
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/expenses">
            Затраты
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/metrics">
            Показатели
          </Button>
        </Box>
        <SetDateRange />
        <Box display="flex" alignItems="center">
          {userId ? (
            <>
              <Typography variant="h6" component="p" mr={2}>
                Вы вошли как {username}
              </Typography>
              <Button variant="contained" onClick={handleLogout}>
                Выйти
              </Button>
            </>
          ) : (
            <>
              {!showLogin && !showRegister && (
                <Button variant="contained" onClick={handleShowRegister} style={{ marginRight: '8px' }}>
                  Регистрация
                </Button>
              )}
              <Button variant="contained" onClick={handleShowLogin}>
                Вход
              </Button>
            </>
          )}
        </Box>
      </Box>
      {showRegister && <Register onRegisterSuccess={handleRegisterSuccess} />}
      {showLogin && <Login onLoginSuccess={handleLoginSuccess} />}
      <TrackingStatus userId={userId} />
    </div>
  );
};

export default HomePage;
