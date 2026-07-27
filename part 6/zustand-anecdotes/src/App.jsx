import { useEffect } from 'react'
import { getAll } from './services/anecdotes'
import { useAnecdotes } from './store'

import Filter from './components/Filter'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const setAnecdotes = useAnecdotes((state) => state.setAnecdotes)

  useEffect(() => {
    getAll().then((anecdotes) => {
      setAnecdotes(anecdotes)
    })
  }, [setAnecdotes])

  return (
    <div>
      <h2>Anecdotes</h2>

      <Filter />

      <AnecdoteList />

      <h2>Create new</h2>

      <AnecdoteForm />
    </div>
  )
}

export default App