import { useAnecdotes } from '../store'

const AnecdoteForm = () => {
  const create = useAnecdotes((state) => state.create)

  const addAnecdote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    if (!content.trim()) return

    create(content)

    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote" />
      </div>

      <button type="submit">
        create
      </button>
    </form>
  )
}

export default AnecdoteForm