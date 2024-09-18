import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { nanoid } from 'nanoid';
import ExpensesRowComponent from './ExpensesRowComponent';
import { fetchApi } from '../../utils/backendApi';
import { useSelector } from 'react-redux';

const ExpensesTable = ({userId}) => {
  const columns = ["Дата", "Реклама", "Затраты на возврат", "Затраты на брак", "Затраты на хостинг", "Другие затраты"];
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

  const [costs, setCosts] = useState([]);
  const { startDate, endDate } = useSelector((state) => state.dateRange);

  const fetchExpensesUrl = "http://localhost:4000/expenses";

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return; // Не выполнять запрос, если userId нет

      try{
        const fetchedCosts = await fetchApi('http://localhost:4000/expenses/get-expenses', 'POST', null, { userId });
        setCosts(fetchedCosts);
      }catch (error) {
        console.error('Error fetching costs:', error);
        setCosts([]); // Устанавливаем пустой массив, если произошла ошибка
      };
    };
  
    fetchData();
  }, [userId]);
  

  const addRow = () => {
    setCosts([...costs, { ...initialCosts, isNew: true }]);
  };

  const saveRow = useCallback(async (data) => {
    const { id, date, advertising, returnCosts, defectCosts, hostingCosts, otherCosts, isNew } = data;
    const payload = { id, date, advertising, returnCosts, defectCosts, hostingCosts, otherCosts, userId };

    if (isNew) {
      const response = await fetchApi(fetchExpensesUrl, 'POST', null, payload );
      console.log(response);
      setCosts(response);
    } else {
      const response = await fetchApi(fetchExpensesUrl, 'PATCH', id, payload );
      setCosts(response);
    }
  }, [setCosts, userId]);

  const deleteRow = useCallback(async (id, isNew) => {
    if (isNew) {
      setCosts(costs => costs.filter(cost => cost.id !== id));
    } else {
      const response = await fetchApi(fetchExpensesUrl, 'DELETE', null, { expenseId: id, userId });
      setCosts(response);
    }
  }, [setCosts, userId]);

  const filteredCosts = costs.filter(cost => {
    const costDate = new Date(cost.date);
    const isWithinDateRange =
    (!startDate || costDate >= new Date(startDate)) &&
    (!endDate || costDate <= new Date(endDate));   
    return (
      isWithinDateRange 
    );
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
