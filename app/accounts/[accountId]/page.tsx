'use client';
import { useAppSelector } from '@/redux/hook';
import bankAccountsList from '../../../bankaccounts.json';
import { selectProfileData } from '../../../redux/features/formSlice';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
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

const expandTransactions= () =>{
  return;
}

export default function BankAccounts( {
  params,
  searchParams,
}: {
  params: {accountId: string}
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const accountElements = [];
  const profileData = useAppSelector(selectProfileData);
  const router = useRouter();

  const navigateToProfile = () => {
    const { accountId } = params;
    router.push(`/profile/${accountId}`);
  };

  for (const accountId in randomUser) {
    const account = randomUser[accountId];
    const accountName = account.accountName;
    const accountRefs = account.accountRefs;
    const accountType = account.accountType;
    const accountBalance = balanceCalculator(account);

    const accountElement = (
        
          <div key={accountRefs} className={styles.accountWrapper}>
            
            <h3>{accountName} {accountType} ref: {accountRefs}</h3>
            <p className={styles.bankBalance}>$ {accountBalance.toFixed(2)}</p>
            <p>Available Balance</p>
            <button className={styles.accountButton} onClick={expandTransactions}>View Transactions</button>
          </div>
          
        
      
    );
    accountElements.push(accountElement);
  }

  return (
    <>
    <h2>{profileData.body.firstName} {profileData.body.userName}</h2>
    <button className={styles.accountButton} onClick={navigateToProfile}>Edit Profile</button>
    <div className={styles.accountsWrapper}>
      {accountElements}
    </div>
    
    </>
  )
}