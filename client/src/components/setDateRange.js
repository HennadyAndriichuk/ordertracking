import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from '@mui/material';

  const SetDateRange =({
    handleSetDateRange, 
    handleResetDates, 
    handleSetTempStartDate, 
    handleSetTempEndDate, 
    startDate, 
    endDate, 
    tempStartDate, 
    tempEndDate
  })=>{
    
    return(
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <input
            type="date"
            value={tempStartDate}
            onChange={(e) => handleSetTempStartDate(e.target.value)}
            style={{ display: "block", marginTop: "8px" }}
          />
          <input
            type="date"
            value={tempEndDate}
            onChange={(e) => handleSetTempEndDate(e.target.value)}
            style={{ display: "block", marginTop: "8px" }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          {!startDate && !endDate && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSetDateRange}
              disabled={!tempStartDate || !tempEndDate} // Кнопка активна только при выборе обеих дат
              style={{
                marginTop: '8px',
                height: '40px', // Высота кнопки
                width: '60px', // Ширина кнопки
                fontSize: '12px' // Размер шрифта внутри кнопки
              }}
            >
              Set<br/> dates
            </Button>
          )}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleResetDates}
            style={{
              marginTop: '8px',
              height: '40px', // Высота кнопки
              width: '60px', // Ширина кнопки
              fontSize: '12px' // Размер шрифта внутри кнопки
            }}
          >
            <ClearIcon />
          </Button>
        </div>
      </div>
    );
  };

export default SetDateRange;
