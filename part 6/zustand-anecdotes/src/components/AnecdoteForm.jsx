import { useAnecdotes } from '../store'
import { createAnecdote } from '../services/anecdotes'

const AnecdoteForm = () => {
  const addAnecdote = useAnecdotes((state) => state.addAnecdote)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value.trim()

    if (!content) {
      return
    }

    const savedAnecdote = await createAnecdote(content)

    addAnecdote(savedAnecdote)

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