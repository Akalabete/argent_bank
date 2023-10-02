'use client';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import bankAccountsList from '../../../bankaccounts.json';
import { selectProfileData } from '../../../redux/features/formSlice';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { expandTransaction, collapseTransaction } from "@/redux/features/transactionSlice";
import { updateFormField } from '@/redux/features/formSlice'
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

const randomUser: {  // can be real account from ApI using userId as on the url
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
  params: {accountId: string}
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const profileData = useAppSelector(selectProfileData);
  const router = useRouter();
  const dispatch = useAppDispatch()
  const expandedTransactions = useAppSelector((state) => state.transactions.expandedTransactions)
  const navigateToProfile = () => {
    const { accountId } = params;
    router.push(`/profile/${accountId}`);
  };
  const expandTransactions = (accountId: string) => {
    if (expandedTransactions.includes(accountId)) {
      dispatch(collapseTransaction(accountId));
    } else {
      dispatch(expandTransaction(accountId));
    }
  };
  const saveTransactionDetails = () => {
    return;
  }
  
  const handleTransactionDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
   
    dispatch(updateFormField({ fieldName: name, fieldValue: value }));
    
  }
  return (
    <>
      <h2>{profileData.body.firstName} {profileData.body.userName}</h2>
      <button className={styles.accountButton} onClick={navigateToProfile}>Edit Profile</button>
      <div className={styles.accountsWrapper}>
        {Object.keys(randomUser).map((accountId) => {
          const account = randomUser[accountId];
          const accountName = account.accountName;
          const accountRefs = account.accountRefs;
          const accountType = account.accountType;
          const accountBalance = balanceCalculator(account);
          const accountTransactions = account.accountTransactions;
  
          return (
            <div key={accountRefs} className={styles.accountWrapper}>
              <h3>{accountName} {accountType} ref: {accountRefs}</h3>
              <p className={styles.bankBalance}>$ {accountBalance.toFixed(2)}</p>
              <p>Available Balance</p>
              <button
                className={styles.accountButton}
                onClick={() => expandTransactions(accountId)} 
              >
                View Transactions
              </button>
              {expandedTransactions.includes(accountId) &&  (
                <div className={styles.expandablesTransactionsContainer}>
                  {accountTransactions.map((transaction) => (
                    <div key={transaction.transactionId} className={styles.transactionWrapper}>
                      <h4>transaction N°{transaction.transactionId} date:{transaction.transactionDate} type: {transaction.transactionType} amount: {transaction.transactionAmount}</h4>
                      <p>location: {transaction.transactionLocation}</p>
                      <form>
                        <label>transaction details:</label>
                        <input
                          type="text"
                          name="transactionDetails"
                          id="inputTransactionDetails"
                          value={transaction.transactionDetails}
                          onChange={handleTransactionDetailsChange}
                        />
                        <button 
                          type="submit" 
                          
                          name="saveTransactionDetails"
                          onClick={saveTransactionDetails}
                          >
                        save details 
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}