import { configureStore } from "@reduxjs/toolkit";
import filter from "../features/filterSlice";
import basket from "../features/basketSlice";

export const store = configureStore({
  reducer: {
    filter,
    basket
  },
});
