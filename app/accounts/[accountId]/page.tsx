'use client';
import { useAppSelector } from '@/redux/hook';
import bankAccountsList from '../../../bankaccounts.json';
import { selectProfileData } from '../../../redux/features/formSlice'
const balanceCalculator = (account: { accountTransactions: any[] }) => {
  let accountBalance = 0;

  for (let i = 0; i < account.accountTransactions.length; i++) {
    const transaction = account.accountTransactions[i];
    const transactionAmount = parseFloat(transaction.transactionAmount);
    if (transactionAmount < 0) {
      accountBalance -= Math.abs(transactionAmount);
    } else {
      accountBalance += transactionAmount;
    }
  }

  return accountBalance;
};
const randomUser: {
  [accountId: string]: {
    accountName: string;
    accountRefs: string;
    accountType: string;
    previousAccountBalance: number;
    accountTransactions: {
      transactionId: string;
      transactionDate: string;
      transactionLocation: string;
      transactionType: string;
      transactionAmount: string;
      transactionDetails: string;
    }[];
  };
} = bankAccountsList.randomUser;

export default function BankAccounts( {
  params,
  searchParams,
}: {
  params: {accountId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const accountElements = [];
  const profileData = useAppSelector(selectProfileData);
  console.log(profileData.body.firstName);
  for (const accountId in randomUser) {
    const account = randomUser[accountId];
    const accountName = account.accountName;
    const accountRefs = account.accountRefs;
    const accountType = account.accountType;
    const accountBalance = balanceCalculator(account);

    const accountElement = (
      <div key={accountId}>
        <h1>Compte</h1>
        <p>{accountName} {accountType} ref: {accountRefs}</p>
        <p>Solde : ${accountBalance.toFixed(2)}</p>
      </div>
    );

    accountElements.push(accountElement);
  }
  return (
    <>
    <h2>{profileData.body.firstName}</h2>
    <div className="bankAccounts">
      {accountElements}
    </div>
    </>
  )
}