import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalUser {
  email: string;
  username: string;
  lastName: string;
  password: string;
  firstName: string;
  authToken: string | null;
  userId: string | null;
}

const initialState: GlobalUser = {
  email: '',
  username: '',
  lastName: '',
  password: '',
  firstName: '',
  authToken: null,
  userId: null,
};

const globalUserSlice = createSlice({
  name: 'globalUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<GlobalUser>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const selectGlobalUser = (state: { globalUser: GlobalUser }) => state.globalUser;

export const { setUser } = globalUserSlice.actions;
export default globalUserSlice.reducer;
