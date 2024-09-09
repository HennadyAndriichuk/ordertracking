import React from 'react';
import { TextField } from '@mui/material';

const OrderNumberInput = ({ value, onChange, showError, errorMessage }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 14) {
      onChange(newValue);
    }
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      variant="outlined"
      size="small"
      fullWidth
      placeholder="Номер заказа"
      error={showError}
      helperText={showError ? errorMessage : ''}
      inputProps={{ maxLength: 14 }} // Ограничение на количество символов
      style={{ width: '170px' }} // Увеличиваем ширину на 10%
    />
  );
};

export default OrderNumberInput;
