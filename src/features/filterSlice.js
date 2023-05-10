import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectFilter = (state) => state.filter;

export const selectSort = (state) => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearch } =
  filterSlice.actions;

export default filterSlice.reducer;
