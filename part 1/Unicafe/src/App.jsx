//=========================== EXERCISE 1.6 UNICAFE ===============

import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <h2>Feedback so far</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>All: {all}</p>
      <p>average: {average.toFixed(1)}</p>
      <p>positive: {positive.toFixed(1)}%</p>
    </div>
  );
};

export default App;