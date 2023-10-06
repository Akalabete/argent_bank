import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import bankAccountsList from '@/bankaccounts.json';
import { RootState } from "../store";

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

    updateTransactionDetails: (state, action: PayloadAction<{ accountId: string; transactionId: string; transactionDetails: string }>) => {
      const { accountId, transactionId, transactionDetails } = action.payload;
      const account = (bankAccountsList.randomUser as { [accountId: string]: any })[accountId];
      const transaction = account?.accountTransactions.find((t: { transactionId: string; }) => t.transactionId === transactionId);
      if (transaction) {
        transaction.transactionDetails = transactionDetails;
      }
    },
    toggleAccount: (state, action: PayloadAction<string>) => {
      if (state.expandedTransactions.includes(action.payload)) {
        state.expandedTransactions = state.expandedTransactions.filter(
          (id) => id !== action.payload
        );
      } else {
        state.expandedTransactions.push(action.payload);
      }
    },
  },
});


export const selectExpandedTransactions = (state: RootState) => state.transactions.expandedTransactions;
export const {  updateTransactionDetails, toggleAccount } = transactionSlice.actions;

export default transactionSlice.reducer;
