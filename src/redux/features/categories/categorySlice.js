import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryForm: false,
  categories: [],
  incomeCategories: [],
  expenseCategories: [],
  categoryCache: {
    title: "",
    type: "",
    category: "",
  },
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
    setCategoryCache: (state, action) => {
      state.categoryCache.title = action.payload.title;
      state.categoryCache.type = action.payload.type;
      state.categoryCache.category = action.payload.category;
    },
  },
});

export const {
  activateCategoryForm,
  deactivateCategoryForm,
  setCategories,
  setCategoryCache,
} = categorySlice.actions;

export const selectCategoryForm = (state) => state.category.categoryForm;
export const selectCategories = (state) => state.category.categories;
export const selectIncomeCategories = (state) =>
  state.category.incomeCategories;
export const selectExpenseCategories = (state) =>
  state.category.expenseCategories;
export const selectCategoryCache = (state) => state.category.categoryCache;

export default categorySlice.reducer;
