import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/formSlice";
import userReducer from "./features/userSlice";
import modalReducer from "./features/modalSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    user: userReducer,
    modal: modalReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;