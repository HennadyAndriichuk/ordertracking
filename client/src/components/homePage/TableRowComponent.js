import React, { useState, useEffect, useCallback } from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import OrderNumberInput from './OrderNumberInput';
import OrderStatus from './OrderStatus';
import DateCreated from './DateCreated';
import DocumentSumInput from './DocumentSumInput';
import PhoneInput from './PhoneInput';
import DocumentCost from './DocumentCost';

const buttonStyle = {
  minWidth: '50px',
  padding: '4px 8px'
};

const TableRowComponent = ({ id, data, onSave, onDelete, onSortChange, existingOrderNumbers }) => {
  const checkedStatuses = data.checkedStatuses || { isPhoneNumberChecked: false};

  const [inputs, setInputs] = useState({
    ...data,
    isPhoneNumberChecked: checkedStatuses.isPhoneNumberChecked
  });
  const [showError, setShowError] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);
  const [showSumError, setShowSumError] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [showCostError, setShowCostError] = useState(false);

  useEffect(() => {
    setInputs({
      ...data,
      isPhoneNumberChecked: checkedStatuses.isPhoneNumberChecked
    });
  }, [data, checkedStatuses.isPhoneNumberChecked]);

  const handleInputChange = useCallback((key, value) => {
    const newInputs = { ...inputs, [key]: value, error: false, isChanged: key !== "isPhoneNumberChecked"};
    setInputs(newInputs);
    if (key === "orderNumber") {
      setShowError(false);
      setDuplicateError(false);
    }else if (key === "documentSum") {
      setShowSumError(false);
    }else if (key === "phoneNumber") {
      setShowPhoneError(false);
    }else if (key === "cost") {
      setShowCostError(false);
    }
  }, [inputs]);

  const handleSortChange = useCallback((sortKey, isSorted, filterValue) => {
    handleInputChange(sortKey, isSorted);
    onSortChange(sortKey, isSorted, filterValue, id);
  }, [handleInputChange, onSortChange, id]);

  const handleSave = () => {
    const { orderNumber, documentSum, phoneNumber, cost } = inputs;

    if (orderNumber.length !== 14 || !/^\d+$/.test(orderNumber)) {
      setShowError(true);
      return;
    }
    
    if (!/^\d+$/.test(documentSum)) {
      setShowSumError(true);
      return;
    }

    if (!/^\d+$/.test(cost)) {
      setShowCostError(true);
      return;
    }

    if (!/^[\d()]*$/.test(phoneNumber) || phoneNumber.length !== 12) {
      setShowPhoneError(true);
      return;
    }

    if (existingOrderNumbers.includes(orderNumber) && orderNumber !== data.orderNumber) {
      setDuplicateError(true);
      return;
    }

    const { id, status, date, isNew } = inputs;
    const payload = { id, orderNumber, status, date, documentSum, phoneNumber, cost, isNew };
    onSave(payload);

    setShowError(false);
    setDuplicateError(false);
    setShowSumError(false);
    setShowPhoneError(false);
    setShowCostError(false);
  };

  const handleDelete = () => {
    onDelete(inputs.isNew);
  };

  return (
    <TableRow key={id}>
      <TableCell key={`orderNumber-${id}`}>
        <OrderNumberInput
          value={inputs.orderNumber}
          onChange={(value) => handleInputChange("orderNumber", value)}
          showError={showError || duplicateError}
          errorMessage={duplicateError ? 'Номер заказа уже существует' : 'Номер должен быть целым положительным 14-значным числом'}
        />
      </TableCell>
      <TableCell key={`status-${id}`}>
        <OrderStatus
          status={inputs.status}
        />
      </TableCell>
      <TableCell key={`date-${id}`}>
        <DateCreated
          date={inputs.date}
        />
      </TableCell>
      <TableCell key={`documentSum-${id}`}>
        <DocumentSumInput
          value={inputs.documentSum}
          onChange={(value) => handleInputChange("documentSum", value)}
          showSumError={showSumError}
          errorMessage='Сумма должна быть целым положительным числом'
        />
      </TableCell>
      <TableCell key={`phoneNumber-${id}`}>
        <PhoneInput
          value={inputs.phoneNumber}
          onChange={(value) => handleInputChange("phoneNumber", value)}
          showPhoneError={showPhoneError}
          errorMessage='Номер телефона должен быть корректным'
          isSorted={inputs.isPhoneNumberChecked}
          onSortChange={(isSorted, value) => handleSortChange("isPhoneNumberChecked", isSorted, value)}
        />
      </TableCell>
      <TableCell key={`cost-${id}`}>
        <DocumentCost
          value={inputs.cost}
          onChange={(value) => handleInputChange("cost", value)}
          showSumError={showCostError}
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

export default TableRowComponent;
