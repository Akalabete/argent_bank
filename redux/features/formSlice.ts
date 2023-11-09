
import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { RootState } from '../store';

interface FormState {
  email: string;
  password: string;
  userName: string;
  authToken: string | null;
  
  firstName: string | null;
  lastName: string | null;
  registrationData: RegistrationForm;
}

interface RegistrationForm {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
}

const initialState: FormState = {
  registrationData: {
    email: "",
    password: "",
    firstname: "",
    lastname: "",   
    username: "",
  },
  email: "",
  password: "",
  userName: "",
  authToken: "",
  
  firstName: "",
  lastName: "",
};



const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormField: (state, action: PayloadAction<{ fieldName: string; fieldValue: any }>) => {
      const { fieldName, fieldValue } = action.payload;
      state[fieldName as keyof FormState] = fieldValue;
    },
    
    updateRegistrationFormField: (
      state,
      action: PayloadAction<{ fieldName: string; fieldValue: any }>
      ) => {
      const { fieldName, fieldValue } = action.payload;
      state.registrationData[fieldName as keyof RegistrationForm] = fieldValue;
     },
  },
  
});


export const updateAuthToken = createAction<string>("form/updateAuthToken");
export const { updateFormField, updateRegistrationFormField } = formSlice.actions;
export const selectRegistrationData = (state: RootState) => state.form.registrationData;



export default formSlice.reducer;

