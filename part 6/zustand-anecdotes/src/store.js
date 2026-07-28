import { create } from 'zustand'

export const useAnecdotes = create((set) => ({
  anecdotes: [],

  filter: '',

  setAnecdotes: (anecdotes) =>
  set({
    anecdotes,
    }),

  updateAnecdote: (updatedAnecdote) =>
    set((state) => ({
      anecdotes: state.anecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id
          ? updatedAnecdote
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

  addAnecdote: (anecdote) =>
    set((state) => ({
      anecdotes: state.anecdotes.concat(anecdote),
    })),

  removeAnecdote: (id) =>
    set((state) => ({
      anecdotes: state.anecdotes.filter(
        (anecdote) => anecdote.id !== id
      ),
    })),
}))