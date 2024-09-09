import React from 'react';
import { TextField } from '@mui/material';
import { FormControlLabel, Checkbox } from '@mui/material';

const PhoneInput = ({ value, onChange, showPhoneError, errorMessage, isSorted, onSortChange  }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 12) {
      onChange(newValue);
    }
  };
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    onSortChange(isChecked, value);
  };

  return (
    <div>
      <TextField
        value={value}
        onChange={handleChange}
        variant="outlined"
        size="small"
        fullWidth
        placeholder="Телефон"
        error={showPhoneError}
        helperText={showPhoneError ? errorMessage : ''}
        inputProps={{ maxLength: 12 }} // Ограничение на количество символов
        style={{ width: '140px' }} // Увеличиваем ширину на 10%
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isSorted ?? false}
            onChange={handleCheckboxChange}
          />
        }
        label="Фильтр"
      />
    </div>
  );
};

export default PhoneInput;
