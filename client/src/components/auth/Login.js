import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      const decoded = jwtDecode(response.data.token);
      onLoginSuccess(decoded.userId, decoded.username);
      console.log(decoded.username)
    } catch (err) {
      alert('Ошибка при входе');
    }
  };

  return (
    <Box>
      <Typography variant="h4">Вход</Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Войти
      </Button>
    </Box>
  );
};

export default Login;
