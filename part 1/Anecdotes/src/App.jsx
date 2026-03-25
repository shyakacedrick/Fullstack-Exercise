import { useState } from "react";

const App = () => {
  const anecdotes = [
    "Why did the React component go to the doctor? Because it couldn't setState.",
    "How do React components say you're welcome? Prop you very much!",
    "Fix the cause, not the symptom",
    "Adding manpower makes it later",
    "Premature optimization is the root of all evil",
    "If it hurts, do it more often",
    "Debugging is twice as hard as writing code",
    "Simplicity is the soul of efficiency",
    "Make it work, then make it right",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    new Array(anecdotes.length).fill(0)
  );

  const nextAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const vote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const maxVotes = Math.max(...votes);
  const bestIndex = votes.indexOf(maxVotes);

  return (
    <>
      <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>

      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next</button>

      <h2>Top voted anecdote</h2>
        <p>{anecdotes[bestIndex]}</p>
        <p>has {maxVotes} votes</p>
    </>
  );
};

export default App;