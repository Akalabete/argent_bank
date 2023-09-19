
import { createAsyncThunk, createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { setConnected } from "./userSlice";
import { AppDispatch } from "../store";
interface FormState {
  email: string;
  password: string;
  nickname: string;
  authToken: string | null;
}
interface FormSubmitData {
  email: string;
  password: string;
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
    const { email, password } = formData;
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
        dispatch(setConnected(true));
        dispatch(updateAuthToken(authToken));
        console.log(data);
        console.log(authToken);
      } else {
        
        console.error("Erreur lors de l'envoi du formulaire au serveur");
      }
    } catch (error) {
      console.error("Erreur lors de la requête au serveur :", error);
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


/*
submitForm:  async (state, action: PayloadAction<FormSubmitData>) => {
      const { email, password } = action.payload;
      try {
        const response = await fetch("http://localhost:3001/api/v1/user/login",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password}),
        });

        if(response.status === 200){

          const token = response.token;
          dispatch(setConnected(true));
        }else {
          console.error("Erreur lors de l'envoi du formulaire au serveur");
        }
      }catch (error) {
        console.error("Erreur lors de la requête au serveur :", error);
      } 
    },
    */