import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../../redux/store';
interface UserState {
  isConnected: boolean;
}

const initialState: UserState = {
  isConnected: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setConnected } = userSlice.actions;

export const selectIsConnected = createSelector(
    (state: RootState) => state.user,
    (user) => user.isConnected
    );

export default userSlice.reducer;