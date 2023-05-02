import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import transactionReducer from "../features/transactions/transactionSlice";
import categoryReducer from "../features/categories/categorySlice";

export default configureStore({
  reducer: {
    transaction: transactionReducer,
    category: categoryReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
