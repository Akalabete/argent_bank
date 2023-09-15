import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/formSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;