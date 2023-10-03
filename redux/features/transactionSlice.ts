import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import bankAccountsList from '@/bankaccounts.json';
interface TransactionState {
  expandedTransactions: string[];
  transactionDetails: string;
}

const initialState: TransactionState = {
  expandedTransactions: [],
  transactionDetails: "",
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
    updateTransactionDetails: (state, action: PayloadAction<{ accountId: string; transactionId: string; transactionDetails: string }>) => {
      const { accountId, transactionId, transactionDetails } = action.payload;
      const account = (bankAccountsList.randomUser as { [accountId: string]: any })[accountId];
      const transaction = account?.accountTransactions.find((t: { transactionId: string; }) => t.transactionId === transactionId);
      if (transaction) {
        transaction.transactionDetails = transactionDetails;
      }
    },
  },
});


export const { expandTransaction, collapseTransaction, updateTransactionDetails } = transactionSlice.actions;

export default transactionSlice.reducer;
