const express = require('express');
const mongoose = require('mongoose');
const Expense = require('../models/Expense');

const expensesRouter = express.Router();

// Endpoint to handle POST requests
expensesRouter.post('/', async(req, res) => {
  const { id, date, advertising, returnCosts, defectCosts, hostingCosts, otherCosts, userId } = req.body;
  try{
    const newExpense = new Expense({
      id,
      date,
      advertising,
      returnCosts,
      defectCosts,
      hostingCosts,
      otherCosts,
      userId
    });
    await newExpense.save();
    const userExpenses = await Expense.find({ userId });
    res.status(201).send(userExpenses);
  } catch(error){
    console.error('Error fetching expense:', error);
    res.status(500).send({ error: 'Failed to fetch expense' });
  }
  
});

// Endpoint to get all expenses
expensesRouter.post('/get-expenses', async(req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).send({ error: 'User ID is required' });
  }

  try {
    const userExpenses = await Expense.find({ userId }); // Ищем расходы по userId
    if (userExpenses.length === 0) {
      return res.status(200).json([]); // Возвращаем пустой массив, если расходов под данным userID нет
    }
    res.status(200).json(userExpenses);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch expenses' });
  }
});

// Endpoint to delete an expense by id
expensesRouter.delete('/', async (req, res) => {
  const { expenseId, userId } = req.body; // Получаем id затраты и userId из тела запроса
  try {
    // Найти и удалить заказ по expenseId и userId
    const expense = await Expense.findOneAndDelete({ id: expenseId, userId });
    if (!expense) {
      return res.status(404).send({ error: 'Expense not found or does not belong to the user' });
    }

    // Найти все оставшиеся затраты для данного userId
    const remainingExpenses = await Expense.find({ userId });
    res.status(200).json(remainingExpenses); // Возвращаем оставшиеся затраты
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete expense' });
  }
});

// Endpoint to handle PATCH requests
expensesRouter.patch('/:id', async(req, res) => {
  const { id: expenceId, userId, ...updatedFields } = req.body;
  
  try{
    const expense = await Expense.findOneAndUpdate({ id: expenceId, userId }, updatedFields, { new: true });
    if (!expense) {
      return res.status(404).send({ error: 'Expense not found' });
    };
    const updatedUserExpenses = await Expense.find({ userId }); // Ищем все затраты пользователя
    res.status(200).json(updatedUserExpenses); // Возвращаем обновленный список затрат пользователя
  }catch (error){
    console.error('Error fetching expense:', error);
    res.status(500).send({ error: 'Failed to fetch expense' });
  };
});

module.exports = expensesRouter;
