import { useState } from "react";
import "./App.css";
import Expense from "./Components/Expense";
import ExpenseProvider from "./Context/ExpenseContext";
function App() {
  const [count, setCount] = useState(0);

  return (
    <ExpenseProvider>
      <div className="App">
        <Expense />
      </div>
    </ExpenseProvider>
  );
}

export default App;
