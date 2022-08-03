import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { ExpenseContext } from "../Context/ExpenseContext";
import Spinner from "../Spinner";
function Expense() {
  const [loading, setLoading] = useState(true);
  const [transType, setTransType] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
    narration: "",
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const { amount, narration } = formData;
  const { totalAmount, handleTransaction, transactionList } =
    useContext(ExpenseContext);
  const onSubmit = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      type: transType,
    }));
    handleTransaction(formData);
    setFormData((prevState) => ({
      ...prevState,
      amount: "",
      narration: "",
    }));
    setTransType("");
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
      type: transType,
    }));
  };
  const handleFormClose = () => {
    setTransType("");
    setFormData((prevState) => ({
      ...prevState,
      amount: "",
      narration: "",
    }));
  };
  if (loading) return <Spinner />;
  return (
    <div>
      <div className="nav">
        <h1>Expense Tracker</h1>
      </div>
      <div className="expenseHead">
        <div className="balanceBox">
          <p>Account Balance</p>
          <p className="balance">
            ₦{totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>
        <button
          onClick={() => {
            setTransType("debit");
          }}
        >
          Send
        </button>
        <button
          onClick={() => {
            setTransType("credit");
          }}
        >
          Fund
        </button>
      </div>
      {transType !== "" && (
        <div className="expenseForm">
          <form className="debitForm" onSubmit={onSubmit}>
            <div className="closeBtn" onClick={handleFormClose}>
              <span>X</span>
            </div>
            <div>
              <h3>{transType.toUpperCase()} Form</h3>
            </div>
            <input
              id="amount"
              type="number"
              className="formInput"
              placeholder="Amount"
              min="500"
              value={amount}
              onChange={onChange}
              required
            />
            <input
              id="narration"
              type="text"
              className="formInput"
              placeholder="Narration"
              value={narration}
              onChange={onChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {transactionList.length > 0 ? (
        <div className="transList">
          {transactionList.map((transaction, index) => (
            <ul
              key={index}
              className="transDiv"
              style={
                transaction.type === "debit"
                  ? { borderRight: "5px red solid" }
                  : { borderRight: "5px #33f82c solid" }
              }
            >
              <li>{transaction.narration}</li>
              <li
                style={
                  transaction.type === "debit"
                    ? { color: "red" }
                    : { color: "#33f82c" }
                }
                className="transAmount"
              >
                {transaction.type === "debit" ? "-" : "+"}₦
                {transaction.amount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </li>
            </ul>
          ))}
        </div>
      ) : (
        <h2>No transaction done Yet</h2>
      )}
    </div>
  );
}

export default Expense;
