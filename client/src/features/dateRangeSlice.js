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
    setStartDateRange: (state) => {
      state.startDate = state.tempStartDate;
    },
    setEndDateRange: (state) => {
      state.endDate = state.tempEndDate;
    },
    setTempStartDate: (state, action) => {
      const { tempStartDate } = action.payload;
      state.tempStartDate = tempStartDate;
    },
    setTempEndDate: (state, action) => {
      const { tempEndDate } = action.payload;
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

export const { setStartDateRange, setEndDateRange, setTempStartDate, setTempEndDate, resetDateRange } = dateRangeSlice.actions;
export default dateRangeSlice.reducer;
