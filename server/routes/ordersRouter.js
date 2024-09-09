const express = require('express');
const mongoose = require('mongoose');
const { updateOrderStatuses, fetchOrderStatus } = require('../updateStatuses');
const Order = require('../models/Order');

const ordersRouter = express.Router();

// Middleware to update order statuses before handling requests
const updateStatusesMiddleware = async (req, res, next) => {
  await updateOrderStatuses();
  next();
};

// Use the middleware for all routes
ordersRouter.use(updateStatusesMiddleware);

// Endpoint to handle POST requests
ordersRouter.post('/', async (req, res) => {
  const { id, orderNumber, documentSum, phoneNumber, cost, userId } = req.body;
  try {
    const updatedData = await fetchOrderStatus(orderNumber);
    const newOrder = new Order({
      id,
      orderNumber,
      status: updatedData.Status,
      date: updatedData.DateCreated,
      documentSum,
      phoneNumber,
      cost,
      userId
    });
    await newOrder.save();
    const userOrders = await Order.find({ userId });
    res.status(201).json(userOrders);
  } catch (error) {
    console.error('Error fetching order status:', error);
    res.status(500).send({ error: 'Failed to fetch order status' });
  }
});

// Endpoint to get all orders
ordersRouter.post('/get-orders', async (req, res) => {
  const { userId } = req.body; // Получаем userId из тела запроса

  if (!userId) {
    return res.status(400).send({ error: 'User ID is required' });
  }

  try {
    const orders = await Order.find({ userId }); // Ищем заказы по userId
    if (orders.length === 0) {
      return res.status(200).json([]); // Возвращаем пустой массив, если заказов нет
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch orders' });
  }
});


ordersRouter.delete('/', async (req, res) => {
  const { orderId, userId } = req.body; // Получаем orderId и userId из тела запроса
  try {
    // Найти и удалить заказ по orderId и userId
    const order = await Order.findOneAndDelete({ id: orderId, userId });
    if (!order) {
      return res.status(404).send({ error: 'Order not found or does not belong to the user' });
    }

    // Найти все оставшиеся заказы для данного userId
    const remainingOrders = await Order.find({ userId });
    res.status(200).json(remainingOrders); // Возвращаем оставшиеся заказы
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete order' });
  }
});


// Endpoint to handle PATCH requests
// Endpoint to handle PATCH requests
ordersRouter.patch('/:id', async (req, res) => {
  const { id: orderId, userId, ...updatedFields } = req.body;

  try {
    const updatedData = await fetchOrderStatus(updatedFields.orderNumber);
    updatedFields.status = updatedData.Status;
    updatedFields.date = updatedData.DateCreated;

    const order = await Order.findOneAndUpdate({ id: orderId, userId }, updatedFields, { new: true });
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }

    const updatedUserOrders = await Order.find({ userId }); // Ищем все заказы пользователя
    res.status(200).json(updatedUserOrders); // Возвращаем обновленный список заказов пользователя
  } catch (error) {
    console.error('Error fetching order status:', error);
    res.status(500).send({ error: 'Failed to fetch order status' });
  }
});



// Endpoint to manually update order statuses
ordersRouter.get('/update-statuses', async (req, res) => {
  try {
    const updatedOrders = await updateOrderStatuses();
    res.status(200).json(updatedOrders);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update order statuses' });
  }
});

module.exports = ordersRouter;
