import { useAnecdotes } from '../store'
import { updateAnecdote } from '../services/anecdotes'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes((state) => state.anecdotes)

  const filter = useAnecdotes((state) => state.filter)

  const update = useAnecdotes(
    (state) => state.updateAnecdote
  )

  const handleVote = async (anecdote) => {
    const updated = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    const saved = await updateAnecdote(updated)

    update(saved)
  }

  const filtered = anecdotes
    .filter((anecdote) =>
      anecdote.content
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
    .toSorted((a, b) => b.votes - a.votes)

  return (
    <>
      {filtered.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>

          <div>
            has {anecdote.votes}

            <button
              onClick={() =>
                handleVote(anecdote)
              }
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList