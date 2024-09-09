import React, { useState, useEffect, useCallback } from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import AdCostInput from './AdCostInputComponent';
import ExpenseDate from './ExpenseDate';
import ReturnCosts from './ReturnCost';
import DefectCost from './DefectCost';
import HostingCost from './HostingCost';
import OtherCost from './OtherCost';

const buttonStyle = {
  minWidth: '50px',
  padding: '4px 8px'
};

const ExpensesRowComponent = ({ id, data, onSave, onDelete }) => {

  const [inputs, setInputs] = useState({
    ...data,
    isChanged: false
  });

  const [showAdError, setShowAdError] = useState(false);
  const [showReturnError, setShowReturnError] = useState(false);
  const [showDefectError, setShowDefectError] = useState(false);
  const [showHostingError, setShowHostingError] = useState(false);
  const [showOtherError, setShowOtherError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);

  useEffect(() => {
    setInputs({
      ...data
    });
  }, [data]);

  const handleInputChange = useCallback((key, value) => {
    const newInputs = { ...inputs, [key]: value, error: false, isChanged: true};
    setInputs(newInputs);
    switch (key) {
      case "date":
        setShowDateError(false);
        break;
      case "advertising":
        setShowAdError(false);
        break;
      case "returnCosts":
        setShowReturnError(false);
        break;
      case "defectCosts":
        setShowDefectError(false);
        break;
      case "hostingCosts":
        setShowHostingError(false);
        break;
      case "otherCosts":
        setShowOtherError(false);
        break;
      default:
        break;
    }
    
  }, [inputs]);

  const handleSave = () => {
    const {date, advertising, returnCosts, defectCosts, hostingCosts, otherCosts} = inputs;
    
    switch (true) {
      case !/^\d{4}-\d{2}-\d{2}$/.test(date):
        setShowDateError(true);
        return;
      case !/^\d*$/.test(advertising):
        setShowAdError(true);
        return;
      case !/^\d*$/.test(returnCosts):
        setShowReturnError(true);
        return;
      case !/^\d*$/.test(defectCosts):
        setShowDefectError(true);
        return;
      case !/^\d*$/.test(hostingCosts):
        setShowHostingError(true);
        return;
      case !/^\d*$/.test(otherCosts):
        setShowOtherError(true);
        return;
      default:
        break;
    }
    
    const { id, isNew } = inputs;
    const payload = { id, date, advertising, returnCosts, defectCosts, hostingCosts, otherCosts, isNew };
    onSave(payload);

    setShowAdError(false);
    setShowReturnError(false);
    setShowDefectError(false);
    setShowHostingError(false);
    setShowOtherError(false);
    setShowDateError(false);
  };

  const handleDelete = () => {
    onDelete(inputs.isNew)
  };

  

  return (
    <TableRow key={id}>
      <TableCell key={`date-${id}`}>
        <ExpenseDate
          value={inputs.date}
          onChange={(value) => handleInputChange("date", value)}
          showError={showDateError}
          errorMessage='Введите дату'
        />
      </TableCell>
      <TableCell key={`advertising-${id}`}>
        <AdCostInput
          value={inputs.advertising}
          onChange={(value) => handleInputChange("advertising", value)}
          showError={showAdError}
          errorMessage='Сумма должна быть целым положительным числом'
        />
      </TableCell>
      <TableCell key={`returnCosts-${id}`}>
        <ReturnCosts
          value={inputs.returnCosts}
          onChange={(value) => handleInputChange("returnCosts", value)}
          showError={showReturnError}
          errorMessage='Сумма должна быть целым положительным числом'
        />
      </TableCell>
      <TableCell key={`defectCosts-${id}`}>
        <DefectCost
          value={inputs.defectCosts}
          onChange={(value) => handleInputChange("defectCosts", value)}
          showError={showDefectError}
          errorMessage='Сумма должна быть целым положительным числом'
        />
      </TableCell>
      <TableCell key={`hostingCosts-${id}`}>
        <HostingCost
          value={inputs.hostingCosts}
          onChange={(value) => handleInputChange("hostingCosts", value)}
          showError={showHostingError}
          errorMessage='Сумма должна быть целым положительным числом'
        />
      </TableCell>
      <TableCell key={`otherCosts-${id}`}>
        <OtherCost
          value={inputs.otherCosts}
          onChange={(value) => handleInputChange("otherCosts", value)}
          showError={showOtherError}
          errorMessage='Сумма должна быть целым положительным числом'
        />
      </TableCell>
      <TableCell key={`saveButton-${id}`}>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSave}
          disabled={!data.isNew && !inputs.isChanged}
          style={buttonStyle}
        >
          {data.isNew ? "Записать" : "Обновить"}
        </Button>
      </TableCell>
      <TableCell key={`deleteButton-${id}`}>
        <Button color="secondary" variant="contained" onClick={handleDelete} style={buttonStyle}>
          Удалить
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ExpensesRowComponent;
