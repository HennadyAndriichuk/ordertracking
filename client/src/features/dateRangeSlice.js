// src/features/dateRangeSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState: {
    startDate: "",
    endDate: "",
    tempStartDate: "",
    tempEndDate: ""
  },
  reducers: {
    setDateRange: (state) => {
      state.startDate = state.tempStartDate;
      state.endDate = state.tempEndDate;
    },
    setTempStartDate: (state, action) => {
      const { tempStartDate, tempEndDate } = action.payload;
      state.tempStartDate = tempStartDate;
      state.tempEndDate = tempEndDate;
    },
    resetDateRange: (state) => {
      state.startDate = "";
      state.endDate = "";
      state.tempStartDate = "";
      state.tempEndDate = "";
    }
  }
});

export const { setDateRange, resetDateRange } = dateRangeSlice.actions;
export default dateRangeSlice.reducer;
