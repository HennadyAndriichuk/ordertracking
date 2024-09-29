// src/features/expensesSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const filteredCostsSlice = createSlice({
  name: 'filteredCosts',
  initialState: {
    filteredCosts: [],
  },
  reducers: {
    setFilteredCosts: (state, action) => {
      state.filteredCosts = action.payload;
    },
    clearFilteredCosts: (state) => {
      state.filteredCosts = [];
    }
  }
});

export const { setFilteredCosts, clearFilteredCosts } = filteredCostsSlice.actions;
export default filteredCostsSlice.reducer;
