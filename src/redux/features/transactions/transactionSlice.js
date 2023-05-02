import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionForm: false,
  transactions: [],
  income: [],
  expenses: [],
  editTransactionForm: false,
  editTransaction: {
    id: "",
    title: "",
    amount: "",
    type: "",
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
    activateEditTransactionForm: (state) => {
      state.editTransactionForm = true;
    },
    deactivateEditTransactionForm: (state) => {
      state.editTransactionForm = false;
    },
    setEditTransaction: (state, action) => {
      state.editTransaction.id = action.payload.id;
      state.editTransaction.title = action.payload.title;
      state.editTransaction.amount = action.payload.amount;
      state.editTransaction.type = action.payload.type;
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
  activateEditTransactionForm,
  deactivateEditTransactionForm,
  setEditTransaction,
  activateDeleteTransactionBox,
  deactivateDeleteTransactionBox,
  setDeleteTransaction,
} = transactionSlice.actions;

export const selectTransactionForm = (state) =>
  state.transaction.transactionForm;
export const selectTransactions = (state) => state.transaction.transactions;
export const selectIncome = (state) => state.transaction.income;
export const selectExpenses = (state) => state.transaction.expenses;
export const selectEditTransactionForm = (state) =>
  state.transaction.editTransactionForm;
export const selectEditTransaction = (state) =>
  state.transaction.editTransaction;
export const selectDeleteTransactionBox = (state) =>
  state.transaction.deleteTransactionBox;
export const selectDeleteTransaction = (state) =>
  state.transaction.deleteTransaction;

export default transactionSlice.reducer;
