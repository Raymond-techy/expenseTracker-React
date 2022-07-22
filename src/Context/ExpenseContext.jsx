import { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [totalAmount, setTotalAmount] = useState(5000);
  const [transactionList, setTransactionList] = useState([]);
  const handleTransaction = (transaction) => {
    console.log(transaction);
    if (transaction.type === "credit" && transaction.amount !== 0) {
      setTotalAmount((prevState) => prevState + +transaction.amount);
    } else if (
      transaction.type === "debit" &&
      totalAmount >= +transaction.amount
    ) {
      setTotalAmount((prevState) => prevState - +transaction.amount);
    } else if (Number(transaction.amount) > totalAmount) {
      alert("insufficient Fund");
      return;
    }

    setTransactionList((prevState) => [transaction, ...prevState]);
    return;
  };
  return (
    <ExpenseContext.Provider
      value={{
        totalAmount,
        transactionList,
        handleTransaction,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
