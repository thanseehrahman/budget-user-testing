import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import transactionReducer from "../features/transactions/transactionSlice";
import categoryReducer from "../features/categories/categorySlice";
import navbarReducer from "../features/navbar/navbarSlice";

export default configureStore({
  reducer: {
    transaction: transactionReducer,
    category: categoryReducer,
    navbar: navbarReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
