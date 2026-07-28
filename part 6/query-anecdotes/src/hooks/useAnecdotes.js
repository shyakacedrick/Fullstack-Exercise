import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  getAnecdotes,
  createAnecdote,
  updateAnecdote,
} from '../requests'

import { useNotify } from '../NotificationContext'

export const useAnecdotes = () => {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })
}

export const useCreateAnecdote = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  return useMutation({
    mutationFn: createAnecdote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes'],
      })

      notify('Anecdote created')
    },

    onError: (error) => {
      notify(error.message)
    },
  })
}

export const useVoteAnecdote = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  return useMutation({
    mutationFn: updateAnecdote,

    onSuccess: (returnedAnecdote) => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes'],
      })

      notify(
        `you voted '${returnedAnecdote.content}'`
      )
    },
  })
}