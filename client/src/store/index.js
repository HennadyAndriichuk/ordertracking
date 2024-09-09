import { configureStore } from '@reduxjs/toolkit';
import dateRangeReducer from '../features/dateRangeSlice'; // Новый редюсер

const store = configureStore({
  reducer: {
    dateRange: dateRangeReducer,  // Подключаем редюсер диапазона дат
  },
});

export default store;