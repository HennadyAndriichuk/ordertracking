import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:4000/users/register', { username, email, password });
      if (response.status === 201) {
        setMessage('Регистрация успешна! Теперь войдите на сайт.');
        onRegisterSuccess();
      }
    } catch (err) {
      setMessage('Ошибка при регистрации пользователя');
    }
  };

  return (
    <Box>
      <Typography variant="h4">Регистрация</Typography>
      <TextField
        label="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
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
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Регистрация
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </Box>
  );
};

export default Register;
