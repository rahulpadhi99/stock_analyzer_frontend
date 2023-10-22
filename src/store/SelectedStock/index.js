import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedStocks: [],
};

export const selectedStockSlice = createSlice({
  name: "selectedStock",
  initialState,
  reducers: {
    addStock: (state, action) => {
      return { ...state, selectedStocks: action?.payload };
    },
    resetSelectedStocks: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { addStock, resetSelectedStocks } = selectedStockSlice.actions;

export default selectedStockSlice.reducer;
