const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const ordersRouter = require('./routes/ordersRouter');
const expensesRouter = require('./routes/expensesRouter');
const userRoutes = require('./routes/user'); // Импорт маршрутов для пользователей

const configPath = path.resolve(__dirname, 'nodemon.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

process.env.DB_USER = config.env.DB_USER;
process.env.DB_PASSWORD = config.env.DB_PASSWORD;
process.env.DB_NAME = config.env.DB_NAME;

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zjlwusa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Import the updateStatuses script
require('./updateStatuses');

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use routers
app.use('/orders', ordersRouter);
app.use('/expenses', expensesRouter);
app.use('/users', userRoutes); // Использование маршрутов пользователей

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
