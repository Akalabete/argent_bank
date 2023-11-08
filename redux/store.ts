import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/formSlice";
import userReducer from "./features/userSlice";
import modalReducer from "./features/modalSlice";
import authReducer from "./features/authSlice";
import transactionReducer from "./features/transactionSlice";
import globalUserReducer from "./features/globalUserSlice";
export const store = configureStore({
  reducer: {
    form: formReducer,
    user: userReducer,
    modal: modalReducer,
    auth: authReducer,
    transactions: transactionReducer,
    globalUser: globalUserReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;