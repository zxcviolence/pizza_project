import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { getItemsFromLS } from "../utils/getItemsFromLS";
import { calcTotalPrice } from "../utils/calcTotalPrice";

export type BasketItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface BasketSliceState {
  totalPrice: number;
  items: BasketItem[];
}

const { items, totalPrice } = getItemsFromLS();

const initialState: BasketSliceState = {
  totalPrice,
  items,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<BasketItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectBasket = (state: RootState) => state.basket; // Селектор

export const selectBasketItemById = (id: string) => (state: RootState) =>
  state.basket.items.find((obj) => obj.id === id);

export const { addItem, removeItem, minusItem, clearItems } =
  basketSlice.actions;

export default basketSlice.reducer;
