import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { nanoid } from 'nanoid';
import ExpensesRowComponent from './ExpensesRowComponent';
import { fetchApi } from '../../utils/backendApi';
import { useSelector } from 'react-redux';

const ExpensesTable = ({ userId }) => {
  const columns = ["Дата", "Реклама", "Затраты на возврат", "Затраты на брак", "Затраты на хостинг", "Другие затраты"];
  
  // Начальная структура для новой строки затрат
  const initialCosts = {
    id: nanoid(),
    date: "",
    advertising: "",
    returnCosts: "",
    defectCosts: "",
    hostingCosts: "",
    otherCosts: "",
    userId,
    isNew: true
  };

  const fetchExpensesUrl = "http://localhost:4000/expenses";
  
  // Получаем данные из redux
  const costsState = useSelector((state) => state.costsState || []); // Убедимся, что это массив
  const { startDate, endDate } = useSelector((state) => state.dateRange);

  const [costs, setCosts] = useState([]);

  // Обновляем состояние costs из costsState при изменении
  useEffect(() => {
    if (Array.isArray(costsState)) {
      setCosts(costsState);
    } else {
      console.error('costsState is not an array:', costsState);
    }
  }, [costsState]);

  // Добавление новой строки
  const addRow = () => {
    setCosts([...costs, { ...initialCosts, isNew: true }]);
  };

  // Сохранение строки (POST или PATCH)
  const saveRow = useCallback(async (data) => {
    const { id, date, advertising, returnCosts, defectCosts, hostingCosts, otherCosts, isNew } = data;
    const payload = { id, date, advertising, returnCosts, defectCosts, hostingCosts, otherCosts, userId };

    try {
      let response;
      if (isNew) {
        response = await fetchApi(fetchExpensesUrl, 'POST', null, payload);
      } else {
        response = await fetchApi(fetchExpensesUrl, 'PATCH', id, payload);
      }
      // Проверяем, является ли response массивом, перед обновлением состояния
      if (Array.isArray(response)) {
        setCosts(response);
      } else {
        console.error('Server response is not an array:', response);
      }
    } catch (error) {
      console.error('Error saving row:', error);
    }
  }, [setCosts, userId]);

  // Удаление строки
  const deleteRow = useCallback(async (id, isNew) => {
    if (isNew) {
      setCosts(costs => costs.filter(cost => cost.id !== id));
    } else {
      try {
        const response = await fetchApi(fetchExpensesUrl, 'DELETE', null, { expenseId: id, userId });
        if (Array.isArray(response)) {
          setCosts(response);
        } else {
          console.error('Server response is not an array:', response);
        }
      } catch (error) {
        console.error('Error deleting row:', error);
      }
    }
  }, [setCosts, userId]);

  // Фильтрация по диапазону дат
  const filteredCosts = costs.filter(cost => {
    const costDate = new Date(cost.date);
    // Проверка валидности даты
    if (isNaN(costDate)) {
      return false;
    }
    const isWithinDateRange =
      (!startDate || costDate >= new Date(startDate)) &&
      (!endDate || costDate <= new Date(endDate));

    return isWithinDateRange;
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
            <TableCell>
              <Button
                color="primary"
                variant="contained"
                onClick={addRow}
                disabled={!userId}
              >
                Добавить строку
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCosts.map((cost) => (
            <ExpensesRowComponent
              key={cost.id}
              id={cost.id}
              data={{ ...cost, isNew: cost.isNew }}
              onSave={saveRow}
              onDelete={(isNew) => deleteRow(cost.id, isNew)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpensesTable;
