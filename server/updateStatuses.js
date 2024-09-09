const cron = require('node-cron');
const axios = require('axios');
const Order = require('./models/Order'); // Импорт модели заказа

const apiKey = 'a3e0146033929135960600cd27f26325'; // Замените на ваш API ключ

// Function to fetch order status from Nova Poshta API
const fetchOrderStatus = async (orderNumber) => {
  try {
    const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
      apiKey,
      modelName: 'TrackingDocument',
      calledMethod: 'getStatusDocuments',
      methodProperties: {
        Documents: [
          {
            DocumentNumber: orderNumber,
            Phone: '',
          },
        ],
      },
    });

    if (response.data.data && response.data.data.length > 0) {
      const data = response.data.data[0];
      const DateCreat = new Date(data.ActualDeliveryDate);

      return {
        DateCreated: `${DateCreat.getFullYear()}-${DateCreat.getMonth() + 1}-${DateCreat.getDate()}`,
        Status: data.Status
      };
    } else {
      console.error('No data found for the given tracking number');
      return null;
    }
  } catch (error) {
    console.error('Error fetching order status:', error);
    return null;
  }
};

// Function to update order statuses
const updateOrderStatuses = async () => {
  try {
    const orders = await Order.find(); // Чтение заказов из базы данных
    const updatedOrders = await Promise.all(
      orders.map(async (order) => {
        const updatedData = await fetchOrderStatus(order.orderNumber); // Правильное поле для номера заказа
        if (updatedData && updatedData.Status !== order.status) {
          order.status = updatedData.Status;
          order.date = updatedData.DateCreated;
          await order.save(); // Сохранение обновленного заказа в базу данных
        }
        return order;
      })
    );

    return updatedOrders;
  } catch (error) {
    console.error('Error updating order statuses:', error);
    return [];
  }
};

// Schedule the task to run every 2 hours
cron.schedule('0 */2 * * *', updateOrderStatuses);

console.log('Status update task scheduled to run every 2 hours.');

module.exports = {
  updateOrderStatuses,
  fetchOrderStatus
};
