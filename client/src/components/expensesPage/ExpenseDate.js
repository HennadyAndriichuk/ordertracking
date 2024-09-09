import React from 'react';
import { TextField } from '@mui/material';

const ExpenseDate = ({ value, onChange, showError, errorMessage }) => {
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
        type="date"
        error={showError}
        helperText={showError ? errorMessage : ''}
        style={{ width: '140px' }} 
      />
    </div>
  );
};

export default ExpenseDate;