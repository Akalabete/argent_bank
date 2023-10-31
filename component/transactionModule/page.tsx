import styles from './page.module.scss'

const Transaction = ({ transaction, openTransactions, detailsEditing, selectedCategory, accountId, toggleTransaction, formattedDate, handleTransactionDetailsChange, handleSaveDetails, handleToggleDetailsEditing, handleCategoryChange, handleCategoryConfirmation }: any) => {
    const { transactionId, transactionDate, transactionLocation, transactionAmount, transactionDetails, transactionType } = transaction;

  
    return (
      <div key={transactionId} className={styles.transactionWrapper}>
        <div className={styles.transactionHeader}>
          <span className={styles.date}>{formattedDate(transactionDate)}</span>
          <span className={styles.description}>{transactionLocation}</span>
          <span className={styles.amount}>{transactionAmount}</span>
          <span className={styles.balance}>TBI</span>
          <button
            className={styles.transactionDetailsButton}
            onClick={() => toggleTransaction(transactionId)}
          >
            {openTransactions[transactionId] ? '<' : '>'}
          </button>
        </div>
        {openTransactions[transactionId] && (
          <div className={styles.transactionDetails}>
            <form>
              <label>transaction details: </label>
              <input
                type="text"
                name="transactionDetails"
                id="inputTransactionDetails"
                value={transactionDetails}
                readOnly={!detailsEditing[transactionId]}
                onChange={handleTransactionDetailsChange(accountId, transactionId)}
              />
              {detailsEditing[transactionId] ? (
                <button
                  type="button"
                  name="transactionDetailsButton"
                  id="transactionDetailsButton"
                  onClick={handleSaveDetails(accountId, transactionId)}
                >
                  ✅
                </button>
              ) : (
                <button
                  type="button"
                  name="transactionDetailsButton"
                  id="transactionDetailsButton"
                  onClick={handleToggleDetailsEditing(accountId, transactionId)}
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
                onChange={handleCategoryChange(accountId, transactionId)}
                value={selectedCategory[transactionId]}
              >
                <option value="default">Select a category for the transaction</option>
                <option value="Option1">Option 1</option>
                <option value="Option2">Option 2</option>
                <option value="Option3">Option 3</option>
                <option value="Option4">Option 4</option>
              </select>
              <button
                type="button"
                name="categoryConfirmationButton"
                onClick={handleCategoryConfirmation(accountId, transactionId)}
              >
                ✅
              </button>
            </form>
            <p>type: {transactionType}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default Transaction;