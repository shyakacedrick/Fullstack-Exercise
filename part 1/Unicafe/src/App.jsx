//=========================== EXERCISE 1.9  UNICAFE ===============

import { useState } from "react";

const Statistics = ({good, neutral, bad}) => {

  if (good + neutral + bad === 0) {
  return <div>No feedback given</div>;
  }

  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};




const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>

      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <h2>Statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;