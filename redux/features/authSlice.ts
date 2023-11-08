import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  isAuthentificated: false, 
  userCredentialStorageLocation: false, 
  authToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleAuthentification: (state) => {
      state.isAuthentificated = !state.isAuthentificated; 
    },
    setuserCredentialStorageLocation: (state, action) => {
      state.userCredentialStorageLocation = action.payload; 
    },
    updateAuthToken: (state, action) => {
      state.authToken = action.payload; 
    },
  },
});

export const selectAuthState = (state: RootState) => state.auth;
export const selectuserCredentialStorageLocation = (state: RootState) => state.auth.userCredentialStorageLocation;
export const selectAuthToken = (state: RootState) => state.auth.authToken;
export const selectAuthentificated = (state: RootState) => state.auth.isAuthentificated;

export const { updateAuthToken, toggleAuthentification, setuserCredentialStorageLocation } = authSlice.actions;
export default authSlice.reducer;