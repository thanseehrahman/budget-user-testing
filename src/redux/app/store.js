import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import navbarReducer from "../features/nav/navbarSlice";
import transactionReducer from "../features/transactions/transactionSlice";
import categoryReducer from "../features/categories/categorySlice";

export default configureStore({
  reducer: {
    navbar: navbarReducer,
    transaction: transactionReducer,
    category: categoryReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
