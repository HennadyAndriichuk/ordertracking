// src/features/expensesSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const costsSlice = createSlice({
  name: 'costsState',
  initialState: [], // Изначально это должен быть массив, так как costs это массив
  reducers: {
    setCostsState: (state, action) => {
      return action.payload; // Полностью заменяем массив новым массивом из action
    },
    clearCostsState: (state) => {
      return []; // Очищаем массив, возвращая пустой
    }
  }
});

export const { setCostsState, clearCostsState } = costsSlice.actions;
export default costsSlice.reducer;
