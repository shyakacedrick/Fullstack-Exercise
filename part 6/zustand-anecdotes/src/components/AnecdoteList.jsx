import { useAnecdotes } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes((state) => state.anecdotes)
  const vote = useAnecdotes((state) => state.vote)

  return (
    <>
      {anecdotes.map((anecdote) => (
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