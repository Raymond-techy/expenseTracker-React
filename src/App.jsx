import { useState } from "react";
import "./App.css";
import Expense from "./Components/Expense";
import ExpenseProvider from "./Context/ExpenseContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <ExpenseProvider>
      <div className="App">
        <Expense />
      </div>
      <ToastContainer />
    </ExpenseProvider>
  );
}

export default App;
