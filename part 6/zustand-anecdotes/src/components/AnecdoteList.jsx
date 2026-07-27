import { useAnecdotes } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes((state) => state.anecdotes)
  const filter = useAnecdotes((state) => state.filter)
  const vote = useAnecdotes((state) => state.vote)

  const filteredAnecdotes = anecdotes
    .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    .toSorted((a, b) => b.votes - a.votes)

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
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
    </>
  )
}

export default AnecdoteList