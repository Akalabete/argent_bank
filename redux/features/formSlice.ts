
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  username: string;
  password: string;
}

const initialState: FormState = {
  username: "",
  password: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormField: (state, action: PayloadAction<{ fieldName: string; fieldValue: any }>) => {
      const { fieldName, fieldValue } = action.payload;
      state[fieldName as keyof FormState] = fieldValue;
    },
  },
});

export const { updateFormField } = formSlice.actions;
export default formSlice.reducer;
