import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk("pizzas/fetch", async (params, thunkAPI) => {
  const { order, category, page, sortBy, searchValue } = params;
  const { data } = await axios.get(
    `https://64046c0c80d9c5c7bac766df.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}&page=${page}${searchValue}`
  );
  return data;
});

const initialState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.loading = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const selectPizzaData = (state) => state.pizza

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
