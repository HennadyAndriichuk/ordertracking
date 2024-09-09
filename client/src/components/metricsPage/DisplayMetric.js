import React from 'react';
import { TextField } from '@mui/material';

const DisplayMetric = ({ value }) => {
  return (
    <div>
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        type="number"
        value={value !== undefined && value !== null ? value : ''} // Устанавливаем начальное значение
        inputProps={{ readOnly: true }}
        style={{ width: '140px' }}
      />
    </div>
  );
};

export default DisplayMetric;
