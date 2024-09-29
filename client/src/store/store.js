import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Будет использовать localStorage
import { combineReducers } from 'redux';
import dateRangeReducer from '../features/dateRangeSlice'; // Редюсер диапазона дат
import ordersReducer from '../features/ordersSlice'; // Новый редюсер для filteredOrders
import filteredCostsReducer from '../features/filteredCostsSlice'; // Новый редюсер для filteredCosts
import costsReducer from '../features/costsSlice'; // редюсер для costs


// Конфигурация persist
const persistConfig = {
  key: 'root', // Ключ для хранилища
  storage, // Используем localStorage для сохранения состояния
};

// Объединение редьюсеров
const rootReducer = combineReducers({
  dateRange: dateRangeReducer,  // Подключаем редюсер диапазона дат
  orders: ordersReducer,        // Подключаем редюсер для filteredOrders
  filterdCosts: filteredCostsReducer,        // Подключаем редюсер для filteredCosts
  costsState: costsReducer // Подключаем редюсер для costsState
});

// Настройка persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Конфигурация store с persistedReducer
const store = configureStore({
  reducer: persistedReducer, // Передаем persistedReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Отключаем проверку сериализуемости для redux-persist
    }),
});

// Экспорт store и persistor
export const persistor = persistStore(store);
export default store;
