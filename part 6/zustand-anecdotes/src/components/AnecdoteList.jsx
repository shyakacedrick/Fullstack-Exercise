import { useAnecdotes } from '../store'
import {updateAnecdote, deleteAnecdote} from '../services/anecdotes'
import { useNotificationStore } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes((state) => state.anecdotes)
  const filter = useAnecdotes((state) => state.filter)
  const update = useAnecdotes((state) => state.updateAnecdote)
  const remove = useAnecdotes((state) => state.removeAnecdote)
  const showNotification = useNotificationStore((state) => state.showNotification)

  const handleVote = async (anecdote) => {
    const updated = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    const saved = await updateAnecdote(updated)

    update(saved)
    showNotification( `you voted '${saved.content}'`)
  }

  const handleDelete = async (anecdote) => {
    await deleteAnecdote(anecdote.id)

    remove(anecdote.id)
    showNotification(`you deleted '${anecdote.content}'`)
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

            <button onClick={() => handleVote(anecdote)}>
              vote
            </button>
            
          {anecdote.votes === 0 && (
            <button onClick={() => handleDelete(anecdote)} style={{ marginLeft: 10 }}>
              delete
            </button>
          )}
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList