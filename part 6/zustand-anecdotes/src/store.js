import { create } from 'zustand'

export const useAnecdotes = create((set) => ({
  anecdotes: [],

  filter: '',

  setAnecdotes: (anecdotes) =>
  set({
    anecdotes,
  }),

  vote: (id) =>
    set((state) => ({
      anecdotes: state.anecdotes.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      ),
    })),

  create: (content) =>
    set((state) => ({
      anecdotes: state.anecdotes.concat({
        content,
        votes: 0,
        id: Date.now(),
      }),
    })),

  setFilter: (filter) =>
    set({
      filter,
    }),
}))