//=========================== EXERCISE 1.6 UNICAFE ===============

import { useState } from "react";

const App = () => {
  // task: keep track of a counter
  const [count, setCount] = useState(0);

  // handlers
  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);

  return (
    <div>
      <h1>Counter</h1>
      <p>Current value: {count}</p>
      <button onClick={increase}> + </button>
      <button onClick={decrease}> - </button>
    </div>
  );
};

export default App;
