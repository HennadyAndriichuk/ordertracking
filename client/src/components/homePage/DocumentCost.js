import React from 'react';
import { TextField } from '@mui/material';

const DocumentCost = ({ value, onChange, showCostError, errorMessage }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div>
      <TextField
        value={value}
        onChange={handleChange}
        variant="outlined"
        size="small"
        fullWidth
        placeholder="Сумма заказа"
        error={showCostError}
        helperText={showCostError ? errorMessage : ''}
        inputProps={{ maxLength: 14 }} // Ограничение на количество символов
        style={{ width: '140px' }} // Увеличиваем ширину на 10%
      />
    </div>
  );
};

export default DocumentCost;
