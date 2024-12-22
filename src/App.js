import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  // GLOBAL STATES
  const [countGap, setCountGap] = useState(1);
  const [count, setCounter] = useState(0);

  // PERSIST THE PREVIOUS STATE ACROSS RENDERS
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  });

  const prevCount = prevCountRef.current;

  // Function Handlers
  const handleCount = function () {
    setCounter((c) => (c += countGap)); // Increase the count based on user count gap
  };

  const handleResetCount = function () {
    setCounter(0); // Reset the counter to 0
  };

  return (
    <>
      <h1>React App</h1>
      {/* Components */}
      <ResetCounter onHandleReset={handleResetCount} />
      <Counter count={count} onHandleCount={handleCount} />
      <PreviousCount prevCount={prevCount} />
      <CountGap countGap={countGap} setCountGap={setCountGap} />
    </>
  );
}

function PreviousCount(props) {
  return (
    <button onClick={() => alert(`Previous count is ${props.prevCount}`)}>
      {props.prevCount === undefined ? "No Previous Count" : "Previous Count"}
    </button>
  );
}

function ResetCounter(props) {
  return <button onClick={() => props.onHandleReset()}>Reset Counter</button>;
}

function CountGap(props) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="number"
        onChange={(e) => props.setCountGap(parseInt(e.target.value))}
        value={props.countGap}
        placeholder="Count Gap"
      />
    </form>
  );
}

function Counter(props) {
  return (
    <button onClick={() => props.onHandleCount()}>Count - {props.count}</button>
  );
}

export default App;
