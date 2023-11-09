'use client';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import {  updateTransactionDetails, selectExpandedTransactions, toggleAccount } from "@/redux/features/transactionSlice";

import bankAccountsList from '../../../bankaccounts.json';
import { selectGlobalUser } from '@/redux/features/globalUserSlice';
import styles from './page.module.scss';
import { openModal, closeModal } from "@/redux/features//modalSlice";
import Modal from '../../../component/modal/page';
import Transaction from '../../../component/transactionModule/page'

const balanceCalculator = (account: {
    previousAccountBalance: number;
     accountTransactions: any[] 
}) => {
  let accountBalance = account.previousAccountBalance;
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
  const userData = useAppSelector(selectGlobalUser);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const expandedTransactions = useAppSelector(selectExpandedTransactions);
  const { accountId } = params;

  // action du bouton d'édition de profile
  const navigateToProfile = () => {
    router.push(`/profile/${accountId}`);
  };
  // converti le format de l'heure
  const formattedDate = (transactionDate: string | number | Date) => {
    const date = new Date(transactionDate);
    return date.toLocaleString("en-US");
  };
  // state de l'account actif
  const toggleAccountHandler = (accountId: string) => {
    dispatch(toggleAccount(accountId));
    if (activeAccount === accountId){
      setActiveAccount(null);
    }else {
      setActiveAccount(accountId);
    }
  };
  // action du bouton qui fait apparaitre les transactions
  const toggleTransaction = (transactionId: string) => {
    setOpenTransactions((prevState) => ({
      ...prevState,
      [transactionId]: !prevState[transactionId],
    }));
  };
  // action qui permute le bouton d'edition et le onchange
  const handleToggleDetailsEditing = (accountId: string, transactionId: string) => () => {
    setDetailsEditing((prevState) => ({
      ...prevState,
      [transactionId]: !prevState[transactionId], 
    }));
  };
  // mise a jour de l'affichage des données fournies par l'utilisateur
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
  // validation et traitement des nouvelles données
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
  const handleCategoryConfirmation = (accountId: string, transactionId: string) => () => {
    openModal({
      title: "Success!",
      message: "Category updated successfully.",  
    });
  };

  const modal = useAppSelector((state: { modal: any; }) => state.modal);
  const handleCloseModal = () => {
    dispatch(closeModal()); 
    
  };
  if ( userData.authToken !== null) {
    return (
        <div>
          {activeAccount === null ? (
            <div>
              <h2>Welcome back</h2>
              <h2>{userData.firstName} {userData.userName}</h2>
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
          return expandedTransactions.includes(accountId) && (
            <div key={accountId} className={styles.transactionsWrapper}>
              <div className={styles.boardRow}>
                <span className={styles.date}>Date</span>
                <span className={styles.description}>Description</span>
                <span className={styles.ampount}>Amount</span>
                <span className={styles.balance}>Balance</span>
              </div>
              {accountTransactions.map((transaction) => (
                <Transaction
                  key={transaction.transactionId}
                  transaction={transaction}
                  openTransactions={openTransactions}
                  detailsEditing={detailsEditing}
                  selectedCategory={selectedCategory}
                  accountId={accountId}
                  toggleTransaction={toggleTransaction}
                  formattedDate={formattedDate}
                  handleTransactionDetailsChange={handleTransactionDetailsChange}
                  handleSaveDetails={handleSaveDetails}
                  handleToggleDetailsEditing={handleToggleDetailsEditing}
                  handleCategoryChange={handleCategoryChange}
                  handleCategoryConfirmation={handleCategoryConfirmation}
                />
              ))}
            </div>
            );
          })}
        </div>
      </div>
    );
  }else {
    router.push('/');
  }
}