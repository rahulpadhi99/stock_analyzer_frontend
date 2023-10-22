import { configureStore } from "@reduxjs/toolkit";
import selectedStockReducer from "./SelectedStock";

export const store = configureStore({
  reducer: { selectedStock: selectedStockReducer },
});
