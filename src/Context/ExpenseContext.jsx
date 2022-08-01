import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [totalAmount, setTotalAmount] = useState(5000);
  const [transactionList, setTransactionList] = useState([]);
  const handleTransaction = (transaction) => {
    console.log(transaction);
    if (transaction.type === "credit" && transaction.amount !== 0) {
      setTotalAmount((prevState) => prevState + +transaction.amount);
      toast.success(
        `₦${transaction.amount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} fund added`
      );
    } else if (
      transaction.type === "debit" &&
      totalAmount >= +transaction.amount
    ) {
      setTotalAmount((prevState) => prevState - +transaction.amount);
      toast.success(
        `₦${transaction.amount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} sent`,
        {
          toastId: "%^&%^&&^FRFER",
        }
      );
    } else if (Number(transaction.amount) > totalAmount) {
      toast.error("Insufficient fund", { toastId: "647734ggghvyv6#4" });
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
