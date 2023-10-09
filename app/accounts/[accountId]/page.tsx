'use client';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import {  updateTransactionDetails, selectExpandedTransactions, toggleAccount } from "@/redux/features/transactionSlice";
import bankAccountsList from '../../../bankaccounts.json';
import { selectProfileData } from '../../../redux/features/formSlice';
import styles from './page.module.scss';
import { openModal, closeModal } from "@/redux/features//modalSlice";
import Modal from '../../../component/modal/page';


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
      transactionCategory: string;
    }[];
  };
} = bankAccountsList.randomUser;

export default function BankAccounts({
  params,
}: {
  params: { accountId: string };
}) {
  const [activeAccount, setActiveAccount] = useState<string | null>(null);
  const [openTransactions, setOpenTransactions] = useState<{ [key: string]: boolean }>({});
  const [detailsChanged, setDetailsChanged] = useState<{ [key: string]: boolean }>({});
  const [selectedCategory, setSelectedCategory] = useState<{ [key: string]: string }>({});
  const [detailsEditing, setDetailsEditing] = useState<{ [key: string]: boolean }>({});
  const profileData = useAppSelector(selectProfileData);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const expandedTransactions = useAppSelector(selectExpandedTransactions);
  
  const navigateToProfile = () => {
    const { accountId } = params;
    router.push(`/profile/${accountId}`);
  };

 
  const toggleAccountHandler = (accountId: string) => {
    dispatch(toggleAccount(accountId));
    if (activeAccount === accountId){
      setActiveAccount(null);
    }else {
      setActiveAccount(accountId);
    }
  };

  const toggleTransaction = (transactionId: string) => {
    setOpenTransactions((prevState) => ({
      ...prevState,
      [transactionId]: !prevState[transactionId],
    }));
  };

  const handleSaveDetails = (accountId: string, transactionId: string) => () => {
    // API CALL Put 
    setDetailsEditing((prevState) => ({
      ...prevState,
      [transactionId]: false, 
    }));
    setDetailsChanged((prevState) => ({
      ...prevState,
      [transactionId]: false, 
    }));
    openModal({
      title: "Success!",
      message: "Details updated successfully.",
    });
  };

  const resetTransactionDetails = () => {
    return;

  };

  const handleTransactionDetailsChange = (accountId: string, transactionId: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setDetailsChanged((prevState) => ({
      ...prevState,
      [transactionId]: true,
    }));
    dispatch(
      updateTransactionDetails({
        accountId: accountId,
        transactionId: transactionId,
        transactionDetails: value,
      })
    );
  };

  const handleCategoryChange = (accountId: string, transactionId: string) => (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setSelectedCategory((prevState) => ({
      ...prevState,
      [transactionId]: value, 
    }));
  };

  const handleCategoryConfirmation = (accountId: string, transactionId: string) => () => {
    openModal({
      title: "Success!",
      message: "Category updated successfully.",  
    });
  };

  const formattedDate = (transactionDate: string | number | Date) => {
    const date = new Date(transactionDate);
    return date.toLocaleString("en-US");
  };

  const handleToggleDetailsEditing = (accountId: string, transactionId: string) => () => {
    setDetailsEditing((prevState) => ({
      ...prevState,
      [transactionId]: !prevState[transactionId], 
    }));
  };

  const modal = useAppSelector((state: { modal: any; }) => state.modal);
   

  const handleOpenModal = () => {
    dispatch(openModal({ title: 'Modal Title', message: 'Modal Message' }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    
  };

  return (
      <div>
        {activeAccount === null ? (
          <div>
            <h2>Welcome back</h2>
            <h2>{profileData.body.firstName} {profileData.body.userName}</h2>
            <button className={styles.accountButton} onClick={navigateToProfile}>Edit Profile</button>
          </div>
        ) : (
          <div>&nbsp;</div>
        )}
      
      <div className={styles.accountsWrapper}>
        {Object.keys(randomUser).map((accountId) => {
        const account = randomUser[accountId];
        const accountName = account.accountName;
        const accountRefs = account.accountRefs;
        const accountType = account.accountType;
        const accountBalance = balanceCalculator(account);
        const accountTransactions = account.accountTransactions;

        return (
          
          activeAccount === accountId || activeAccount === null ? (
            <div key={accountRefs} className={styles.accountWrapper}>
              <h3>{accountName} {accountType} ref: {accountRefs}</h3>
              <p className={styles.bankBalance}>$ {accountBalance.toFixed(2)}</p>
              <p>Available Balance</p>
              <button
                className={styles.accountButton}
                onClick={() => toggleAccountHandler(accountId)}
              >
                {expandedTransactions.includes(accountId) ? "Hide transactions" : "View transactions"}
              </button>
              </div>
            ) : null
          );
        })}
      </div>
      {modal.isOpen && (
        <Modal
          isOpen={modal.isOpen}
          title={modal.title}
          message={modal.message}
          onClose={handleCloseModal}
        />
      )}  
      <div>
        {Object.keys(randomUser).map((accountId) => {
          const account = randomUser[accountId];
          const accountTransactions = account.accountTransactions;

          return (
            expandedTransactions.includes(accountId) && (
              <div key={accountId} className={styles.transactionsWrapper}>
                <div className={styles.boardRow}>
                  <span className={styles.date}>Date</span>
                  <span className={styles.description}>Description</span>
                  <span className={styles.ampount}>Amount</span>
                  <span className={styles.balance}>Balance</span>
                </div>
                {accountTransactions.map((transaction) => (
                  <div key={transaction.transactionId} className={styles.transactionWrapper}>
                    <div className={styles.transactionHeader}>
                      <span className={styles.date}>{formattedDate(transaction.transactionDate)}</span>
                      <span className={styles.description}>{transaction.transactionLocation}</span>
                      <span className={styles.amount}>{transaction.transactionAmount}</span>
                      <span className={styles.balance}>TBI</span>
                      <button
                        className={styles.transactionDetailsButton}
                        onClick={() => toggleTransaction(transaction.transactionId)}
                      >
                        {openTransactions[transaction.transactionId] ? '<' : '>'}
                      </button>
                    </div>
                    {openTransactions[transaction.transactionId] && (
                    <div className={styles.transactionDetails}>
                      <form>
                        <label>transaction details: </label>
                        <input
                          type="text"
                          name="transactionDetails"
                          id="inputTransactionDetails"
                          value={transaction.transactionDetails}
                          readOnly={!detailsEditing[transaction.transactionId]}
                          onChange={handleTransactionDetailsChange(accountId, transaction.transactionId)}
                        />
                         {detailsEditing[transaction.transactionId] ? (
                          <button
                            type="button"
                            name="transactionDetailsButton"
                            id="transactionDetailsButton"
                            onClick={handleSaveDetails(accountId, transaction.transactionId)}
                          >
                            ✅
                          </button>
                        ) : (
                          <button
                            type="button"
                            name="transactionDetailsButton"
                            id="transactionDetailsButton"
                            onClick={handleToggleDetailsEditing(accountId, transaction.transactionId)}
                          >
                            ✏️
                          </button>
                        )}
                      </form>
                      <form>
                        <label>transaction category: </label>
                        <select
                          id="transactionCategory"
                          name="transactionCategory"
                          >
                          <option value="default">Select a category for the transaction</option>
                          <option value="Option1">Option 1</option>
                          <option value="Option1">Option 1</option>
                          <option value="Option1">Option 1</option>
                          <option value="Option1">Option 1</option>
                        </select>
                        <button
                            type="button"
                            name="categoryConfirmationButton"
                            onClick={handleCategoryConfirmation(accountId, transaction.transactionId)}
                          >
                            ✅
                          </button>
                    </form>
                    <p>type: {transaction.transactionType}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
            )
          );
        })}
      </div>
    </div>
  );
}