import { useAnecdotes } from './store'

const App = () => {
  const anecdotes = useAnecdotes((state) => state.anecdotes)
  const vote = useAnecdotes((state) => state.vote)

  const sortedAnecdotes = [...anecdotes].sort(
    (a, b) => b.votes - a.votes
  )

  return (
    <div>
      <h2>Anecdotes</h2>

      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>

          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>
              vote
            </button>
          </div>
        </div>
      ))}

      <h2>create new</h2>

      <form>
        <div>
          <input />
        </div>

        <button>create</button>
      </form>
    </div>
  )
}

export default App