import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionForm: false,
  transactions: [],
  income: [],
  expenses: [],
  transactionCache: {
    title: "",
    amount: "",
    type: "",
    categoryID: "",
    categoryName: "",
    date: new Date(),
  },
  editTransactionForm: false,
  editTransactionCache: {
    id: "",
    title: "",
    amount: "",
    type: "",
    categoryID: "",
    categoryName: "",
    date: "",
  },
  deleteTransactionBox: false,
  deleteTransaction: "",
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    activateTransactionForm: (state) => {
      state.transactionForm = true;
    },
    deactivateTransactionForm: (state) => {
      state.transactionForm = false;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload.transactions;
      state.income = action.payload.income;
      state.expenses = action.payload.expenses;
    },
    setTransactionCache: (state, action) => {
      state.transactionCache.title = action.payload.title;
      state.transactionCache.amount = action.payload.amount;
      state.transactionCache.type = action.payload.type;
      state.transactionCache.categoryID = action.payload.categoryID;
      state.transactionCache.categoryName = action.payload.categoryName;
      state.transactionCache.date = action.payload.date;
    },
    activateEditTransactionForm: (state) => {
      state.editTransactionForm = true;
    },
    deactivateEditTransactionForm: (state) => {
      state.editTransactionForm = false;
    },
    setEditTransactionCache: (state, action) => {
      state.editTransactionCache.id = action.payload.id;
      state.editTransactionCache.title = action.payload.title;
      state.editTransactionCache.amount = action.payload.amount;
      state.editTransactionCache.type = action.payload.type;
      state.editTransactionCache.categoryID = action.payload.categoryID;
      state.editTransactionCache.categoryName = action.payload.categoryName;
      state.editTransactionCache.date = action.payload.date;
    },
    activateDeleteTransactionBox: (state) => {
      state.deleteTransactionBox = true;
    },
    deactivateDeleteTransactionBox: (state) => {
      state.deleteTransactionBox = false;
    },
    setDeleteTransaction: (state, action) => {
      state.deleteTransaction = action.payload.id;
    },
  },
});

export const {
  activateTransactionForm,
  deactivateTransactionForm,
  setTransactions,
  setTransactionCache,
  activateEditTransactionForm,
  deactivateEditTransactionForm,
  setEditTransactionCache,
  activateDeleteTransactionBox,
  deactivateDeleteTransactionBox,
  setDeleteTransaction,
} = transactionSlice.actions;

export const selectTransactionForm = (state) =>
  state.transaction.transactionForm;
export const selectTransactions = (state) => state.transaction.transactions;
export const selectIncome = (state) => state.transaction.income;
export const selectExpenses = (state) => state.transaction.expenses;
export const selectTransactionCache = (state) =>
  state.transaction.transactionCache;
export const selectEditTransactionForm = (state) =>
  state.transaction.editTransactionForm;
export const selectEditTransactionCache = (state) =>
  state.transaction.editTransactionCache;
export const selectDeleteTransactionBox = (state) =>
  state.transaction.deleteTransactionBox;
export const selectDeleteTransaction = (state) =>
  state.transaction.deleteTransaction;

export default transactionSlice.reducer;
