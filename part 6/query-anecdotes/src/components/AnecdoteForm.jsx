import { useCreateAnecdote } from '../hooks/useAnecdotes'

const AnecdoteForm = () => {
  const createAnecdoteMutation = useCreateAnecdote()

  const onCreate = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value.trim()

    if (!content) return

    createAnecdoteMutation.mutate(content)

    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={onCreate}>
      <input
        name="anecdote"
        placeholder="Write a new anecdote..."
      />

      <button type="submit">
        create
      </button>
    </form>
  )
}

export default AnecdoteForm