import React, { useState, useEffect } from 'react';
import ExpensesTable from '../components/expensesPage/ExpensesTable';
import { Link } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import { jwtDecode } from 'jwt-decode';
import SetDateRange from '../components/setDateRange';

const ExpensesPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tempStartDate, setTempStartDate] = useState('');
  const [tempEndDate, setTempEndDate] = useState('');

  const handleSetDateRange = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
  };

  const handleSetTempStartDate = (date) => {
    setTempStartDate(date)
  };

  const handleSetTempEndDate = (date) => {
    setTempEndDate(date)
  }
  
  const handleResetDates = () => {
    setTempStartDate('');
    setTempEndDate('');
    setStartDate('');
    setEndDate('');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId);
        setUsername(decoded.username); // Устанавливаем имя пользователя из токена
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
    setUsername(username); // Устанавливаем имя пользователя после логина
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserId(null);
    setUsername(''); // Сбрасываем имя пользователя при выходе
  };

  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h4" component="h1" mr={2}>
            Затраты
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/metrics">
            Показатели
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/">
            Заказы
          </Button>
        </Box>
        <SetDateRange 
          handleSetDateRange={handleSetDateRange} 
          handleResetDates={handleResetDates} 
          handleSetTempStartDate={handleSetTempStartDate}
          handleSetTempEndDate={handleSetTempEndDate}
          startDate={startDate}
          endDate={endDate}
          tempStartDate={tempStartDate}
          tempEndDate={tempEndDate}
        />
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
      <ExpensesTable userId={userId} startDate={startDate} endDate={endDate}/>
    </div>
  );
};

export default ExpensesPage;
