import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes'],
      })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value.trim()

    if (!content) return

    newAnecdoteMutation.mutate(content)

    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={onCreate}>
      <input name="anecdote" />

      <button type="submit">
        create
      </button>
    </form>
  )
}

export default AnecdoteForm