// src/features/ordersSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    filteredOrders: [],
  },
  reducers: {
    setFilteredOrders: (state, action) => {
      state.filteredOrders = action.payload;
    },
    clearFilteredOrders: (state) => {
      state.filteredOrders = [];
    }
  }
});

export const { setFilteredOrders, clearFilteredOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
