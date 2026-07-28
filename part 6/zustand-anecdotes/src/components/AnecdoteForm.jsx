import { useAnecdotes } from '../store'
import { createAnecdote } from '../services/anecdotes'
import { useNotificationStore } from '../notificationStore'

const AnecdoteForm = () => {
  const addAnecdote = useAnecdotes((state) => state.addAnecdote)
  const showNotification = useNotificationStore( (state) => state.showNotification)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value.trim()

    if (!content) {
      return
    }

    const savedAnecdote = await createAnecdote(content)

    addAnecdote(savedAnecdote)
    showNotification( `you created '${savedAnecdote.content}'` )

    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="anecdote"
          placeholder="Write a new anecdote..."
        />
      </div>

      <button type="submit">
        create
      </button>
    </form>
  )
}

export default AnecdoteForm