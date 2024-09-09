import React, { useState, useEffect } from 'react';
import DisplayMetrics from '../components/metricsPage/Metrics';
import { Link } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const MetricsPage = () => {
  const [userId, setUserId] = useState(null);
  //const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId);
        //setUsername(decoded.username); // Устанавливаем имя пользователя из токена
      } catch (error) {
        console.error('Invalid token');
        localStorage.removeItem('token');
      }
    }
  }, []);


  return (
    <div>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h4" component="h1" mr={2}>
          Показатели
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/expenses">
          Затраты
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/">
          Заказы
        </Button>
      </Box>
      <DisplayMetrics userId={userId}/>
    </div>
  );
};

export default MetricsPage;
