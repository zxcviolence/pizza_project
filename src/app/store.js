import { configureStore } from "@reduxjs/toolkit";
import filter from "../features/filterSlice";
import basket from "../features/basketSlice";
import pizza from "../features/pizzaSlice";

export const store = configureStore({
  reducer: {
    filter,
    basket,
    pizza,
  },
});
