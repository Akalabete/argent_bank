import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = { 
  userCredentialStorageLocation: false, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setuserCredentialStorageLocation: (state, action) => {
      state.userCredentialStorageLocation = action.payload; 
    },

  },
});

export const selectuserCredentialStorageLocation = (state: RootState) => state.auth.userCredentialStorageLocation;

export const {  setuserCredentialStorageLocation } = authSlice.actions;
export default authSlice.reducer;