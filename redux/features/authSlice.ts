import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  isAuthenticated: false, 
  tokenStorageLocation: false, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleAuthentication: (state) => {
      state.isAuthenticated = !state.isAuthenticated; 
    },
    setTokenStorageLocation: (state, action) => {
      state.tokenStorageLocation = action.payload; 
    },
  },
});

export const selectAuthState = (state: RootState) => state.auth;
export const selectTokenStorageLocation = createSelector(
  selectAuthState,
  (authState) => authState.tokenStorageLocation
);

export const { toggleAuthentication, setTokenStorageLocation } = authSlice.actions;
export default authSlice.reducer;
