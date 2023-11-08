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
export const selectuserCredentialStorageLocation = createSelector(
  selectAuthState,
  (authState) => authState.userCredentialStorageLocation
);
export const selectAuthToken = createSelector(
  selectAuthState,
  (authState) => authState.authToken
);

export const { updateAuthToken, toggleAuthentification, setuserCredentialStorageLocation } = authSlice.actions;
export default authSlice.reducer;
