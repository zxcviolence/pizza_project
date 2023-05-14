import { configureStore } from "@reduxjs/toolkit";
import filter from "../features/filterSlice";
import basket from "../features/basketSlice";
import pizza from "../features/pizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter,
    basket,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () =>  useDispatch<AppDispatch>()