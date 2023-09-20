
import { createAsyncThunk, createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { setConnected } from "./userSlice";
import { AppDispatch } from "../store";
import { openModal } from "./modalSlice";
import { useRouter } from 'next/navigation';

interface FormState {
  email: string;
  password: string;
  nickname: string;
  authToken: string | null;

}
interface FormSubmitData {
  email: string;
  password: string;
  tokenStorageLocation: boolean,
}

const initialState: FormState = {
  email: "",
  password: "",
  nickname: "User",
  authToken: "",
  
};

export const submitForm = createAsyncThunk(
  "form/submitForm",
  async (formData: FormSubmitData, { dispatch }) => {
    const { email, password, tokenStorageLocation } = formData;
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status===200) {
        const data = await response.json()
        const authToken = data.body.token
        const userData = { email, password, authToken}
        dispatch(setConnected(true));
        dispatch(updateAuthToken(authToken));
        console.log(data);
        console.log(authToken);
        if (tokenStorageLocation){
          localStorage.setItem("userData", JSON.stringify(userData));
          sessionStorage.removeItem("userData");
          console.log(userData)
        } else { 
          sessionStorage.setItem("userData", JSON.stringify(userData));
          localStorage.removeItem("userData");
        }
        
      } else if (response.status === 400) {
        dispatch(
          openModal({
            title: "Incorrect credentials",
            message: "Please verify your credentials",
            
          })
        );
      }
    } catch (error) {
      console.error("error while connecting to server:", error);
    }
  }
);
export const updateAuthToken = createAction<string>("form/updateAuthToken");


const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormField: (state, action: PayloadAction<{ fieldName: string; fieldValue: any }>) => {
      const { fieldName, fieldValue } = action.payload;
      state[fieldName as keyof FormState] = fieldValue;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(submitForm.fulfilled, (state) => {
      
      
    });
    builder.addCase(submitForm.rejected, (state) => {
    });
    builder.addCase(updateAuthToken, (state, action) => {
      state.authToken = action.payload;
    });
  },
});


export const { updateFormField } = formSlice.actions;

export const login = () => (dispatch: AppDispatch) => {
  dispatch(setConnected(true));
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(setConnected(false));
};

export default formSlice.reducer;

