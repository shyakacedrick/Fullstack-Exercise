
import { useAnecdotes } from './store'

const App = () => {
  const anecdotes = useAnecdotes((state) => state.anecdotes)
  const vote = useAnecdotes((state) => state.vote)
  const create = useAnecdotes((state) => state.create)

  const sortedAnecdotes = [...anecdotes].sort(
    (a, b) => b.votes - a.votes
  )

  const addAnecdote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
      if (!content.trim()) return
     create(content)
      event.target.anecdote.value = ''
  }

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

      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App