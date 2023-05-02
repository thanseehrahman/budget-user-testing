import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryForm: false,
  categories: [],
  incomeCategories: [],
  expenseCategories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    activateCategoryForm: (state) => {
      state.categoryForm = true;
    },
    deactivateCategoryForm: (state) => {
      state.categoryForm = false;
    },
    setCategories: (state, action) => {
      state.categories = action.payload.categories;
      state.incomeCategories = action.payload.incomeCategories;
      state.expenseCategories = action.payload.expenseCategories;
    },
  },
});

export const { activateCategoryForm, deactivateCategoryForm, setCategories } =
  categorySlice.actions;

export const selectCategoryForm = (state) => state.category.categoryForm;
export const selectCategories = (state) => state.category.categories;
export const selectIncomeCategories = (state) =>
  state.category.incomeCategories;
export const selectExpenseCategories = (state) =>
  state.category.expenseCategories;

export default categorySlice.reducer;
