import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { fetchApi } from '../../utils/backendApi';
import DisplayMetric from './DisplayMetric';
import { sumAllValues, calculateSumOfDifferences, calculateTotalDocumentSum, calculateDeliveredOrdersProfitWithCost } from '../../utils/calculate';

const columns = ["Прибыль доставленных", "Сумма всех заказов", "Прибыль доставленных без учета затрат", "Сумма затрат", "Номер телефона", "Себестоимость"];

const DisplayMetrics = ({userId}) => {
  const [orders, setOrders] = useState([]);
  const [costs, setCosts] = useState([]);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return; 
      try {
        const [fetchedOrders, fetchedCosts] = await Promise.all([
          fetchApi('http://localhost:4000/orders/get-orders', 'POST', null, { userId }),
          fetchApi('http://localhost:4000/expenses/get-expenses', 'POST', null, { userId })
        ]);

        setOrders(fetchedOrders);
        setCosts(fetchedCosts);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (orders.length && costs.length) {
      const totalCostsSum = sumAllValues(costs);
      const totalDocumentSum = calculateTotalDocumentSum(orders);
      const netProfit = calculateSumOfDifferences(orders, totalCostsSum);
      const profit = calculateDeliveredOrdersProfitWithCost(orders);

      setMetrics({
        netProfit,
        totalDocumentSum,
        profit,
        totalCostsSum,
      });
    }
  }, [orders, costs]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {Object.values(metrics).map((metric, index) => (
              <TableCell key={index}>
                <DisplayMetric value={metric} />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DisplayMetrics;
