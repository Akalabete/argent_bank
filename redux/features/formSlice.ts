
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setConnected } from "./userSlice";
import { AppDispatch } from "../store";
interface FormState {
  username: string;
  password: string;
  nickname: string;
}

const initialState: FormState = {
  username: "",
  password: "",
  nickname: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormField: (state, action: PayloadAction<{ fieldName: string; fieldValue: any }>) => {
      const { fieldName, fieldValue } = action.payload;
      state[fieldName as keyof FormState] = fieldValue;
    }
  },
});

export const { updateFormField } = formSlice.actions;
export default formSlice.reducer;
export const login = () => (dispatch: AppDispatch) => {
  dispatch(setConnected(true));
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(setConnected(false));
};
