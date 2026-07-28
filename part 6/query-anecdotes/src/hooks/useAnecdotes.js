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

import { useNotificationContext } from '../NotificationContext'

export const useAnecdotes = () => {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })
}

export const useCreateAnecdote = () => {
  const queryClient = useQueryClient()

  const [, dispatch] =
    useNotificationContext()

    return useMutation({
      mutationFn: createAnecdote,
    
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['anecdotes'],
        })
    
        dispatch({
          type: 'SHOW',
          payload: 'Anecdote created',
        })
    
        setTimeout(() => {
          dispatch({
            type: 'HIDE',
          })
        }, 5000)
      },
    
      onError: (error) => {
        dispatch({
          type: 'SHOW',
          payload: error.message,
        })
    
        setTimeout(() => {
          dispatch({
            type: 'HIDE',
          })
        }, 5000)
      },
    })
}

export const useVoteAnecdote = () => {
  const queryClient = useQueryClient()

  const [, dispatch] =
    useNotificationContext()

  return useMutation({
    mutationFn: updateAnecdote,

    onSuccess: (returnedAnecdote) => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes'],
      })

      dispatch({
        type: 'SHOW',
        payload: `you voted '${returnedAnecdote.content}'`,
      })

      setTimeout(() => {
        dispatch({
          type: 'HIDE',
        })
      }, 5000)
    },
  })
}