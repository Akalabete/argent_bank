import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface GlobalUser {
  email: string;
  userName: string;
  lastName: string;
  password: string;
  firstName: string;
  authToken: string | null;
  userId: string | null;
  userCredentialStorageLocation: boolean;
}

const initialState:
 GlobalUser = {
  email: '',
  userName: '',
  lastName: '',
  password: '',
  firstName: '',
  authToken: null,
  userId: null,
  userCredentialStorageLocation : false,
};
  

const globalUserSlice = createSlice({
  name: 'globalUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<GlobalUser>) => {
      return { ...state, ...action.payload };
    },
    setuserCredentialStorageLocation: (state, action) => {
      state.userCredentialStorageLocation = action.payload; 
    },
  },
});

export const selectGlobalUser = (state: { globalUser: GlobalUser }) => state.globalUser;
export const selectuserCredentialStorageLocation = (state: RootState) => state.globalUser.userCredentialStorageLocation;

export const {  setuserCredentialStorageLocation } = globalUserSlice.actions;
export const { setUser } = globalUserSlice.actions;
export default globalUserSlice.reducer;
