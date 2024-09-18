import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { nanoid } from 'nanoid';
import TableRowComponent from './TableRowComponent';
import { fetchApi } from '../../utils/backendApi';
import { useSelector } from 'react-redux';

const TrackingStatus = ({ userId }) => {
  const columns = ["Номер заказа", "Статус", "Дата получения", "Сумма документа", "Номер телефона", "Себестоимость"];
  const initialOrder = {
    id: nanoid(),
    userId,
    orderNumber: "",
    status: "",
    date: "",
    documentSum: "",
    phoneNumber: "",
    cost: "",
    isNew: true,
    checkedStatuses: {
      isPhoneNumberChecked: false
    }
  };

  const fetchOrdersUrl = "http://localhost:4000/orders";

  const [orders, setOrders] = useState([]);
  const [filterPhoneNumber, setFilterPhoneNumber] = useState("");
  const { startDate, endDate } = useSelector((state) => state.dateRange);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return; // Не выполнять запрос, если userId нет
      try {
        
        const fetchedOrders = await fetchApi('http://localhost:4000/orders/get-orders', 'POST', null, { userId });
        setOrders(fetchedOrders.map(order => ({
          ...order,
          checkedStatuses: order.checkedStatuses || { isPhoneNumberChecked: false }
        })));
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]); // Устанавливаем пустой массив, если произошла ошибка
      }
    };
  
    fetchData();
  }, [userId]);
  

  const existingOrderNumbers = useMemo(() => orders.map(order => order.orderNumber), [orders]);

  const addRow = () => {
    setOrders([...orders, { ...initialOrder, isNew: true, checkedStatuses: { isPhoneNumberChecked: false } }]);
  };

  const saveRow = useCallback(async (data) => {
    const { id, orderNumber, status, date, documentSum, phoneNumber, cost, isNew } = data;
    const payload = { id, orderNumber, status, date, documentSum, phoneNumber, cost, userId };

    if (isNew) {
      const response = await fetchApi(fetchOrdersUrl, 'POST', null, payload);
      setOrders(response);
    } else {
      const response = await fetchApi(fetchOrdersUrl, 'PATCH', id, payload);
      setOrders(response);
    }
  }, [setOrders, userId]);

  const deleteRow = useCallback(async (id, isNew) => {
    if (isNew) {
      setOrders(orders => orders.filter(order => order.id !== id));
    } else {
      const response = await fetchApi(fetchOrdersUrl, 'DELETE', null, { orderId: id, userId });
      setOrders(response);
    }
  }, [setOrders, userId]);

  const handleSortChange = (sortKey, isSorted, filterValue, id) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, checkedStatuses: { ...order.checkedStatuses, [sortKey]: isSorted } } : order
    ));

    if (sortKey === "isPhoneNumberChecked" && isSorted) {
      setFilterPhoneNumber(filterValue);
    } else {
      setFilterPhoneNumber("");
    }
  };

  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.date);
    const isWithinDateRange =
      (!startDate || orderDate >= new Date(startDate)) &&
      (!endDate || orderDate <= new Date(endDate));

    return (
      isWithinDateRange &&
      (!filterPhoneNumber || order.phoneNumber === filterPhoneNumber)
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>
              {column}
            </TableCell>
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
          {userId && filteredOrders.map((order) => (
            <TableRowComponent
              key={order.id}
              id={order.id}
              data={{ ...order, isNew: order.isNew }}
              existingOrderNumbers={existingOrderNumbers}
              onSave={saveRow}
              onDelete={(isNew) => deleteRow(order.id, isNew)}
              onSortChange={handleSortChange}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrackingStatus;
