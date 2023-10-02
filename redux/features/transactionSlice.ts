import { createSlice } from "@reduxjs/toolkit";

interface TransactionState {
  expandedTransactions: string[];
}

const initialState: TransactionState = {
  expandedTransactions: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    expandTransaction: (state, action) => {
      state.expandedTransactions.push(action.payload); // Ajoutez l'ID de la transaction étendue
    },
    collapseTransaction: (state, action) => {
      state.expandedTransactions = state.expandedTransactions.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { expandTransaction, collapseTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
