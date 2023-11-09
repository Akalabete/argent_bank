import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/formSlice";
import modalReducer from "./features/modalSlice";
import transactionReducer from "./features/transactionSlice";
import globalUserReducer from "./features/globalUserSlice";
export const store = configureStore({
  reducer: {
    form: formReducer,
    modal: modalReducer,
    transactions: transactionReducer,
    globalUser: globalUserReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;