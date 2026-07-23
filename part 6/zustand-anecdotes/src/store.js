import { create } from 'zustand'

const anecdotes = [
  {
    content: 'If it hurts, do it more often',
    votes: 0,
    id: 1,
  },
  {
    content: 'Adding manpower to a late software project makes it later!',
    votes: 0,
    id: 2,
  },
  {
    content: 'Premature optimization is the root of all evil.',
    votes: 0,
    id: 3,
  },
  {
    content: 'Debugging is twice as hard as writing the code in the first place.',
    votes: 0,
    id: 4,
  },
  {
    content: 'Programming without tests is like driving without brakes.',
    votes: 0,
    id: 5,
  },
]

export const useAnecdotes = create((set) => ({
  anecdotes,

  vote: (id) =>
    set((state) => ({
      anecdotes: state.anecdotes.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      ),
    })),
}))