import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { getAll } from './services/anecdotes'
import { useAnecdotes } from './store'

const App = () => {
  const setAnecdotes = useAnecdotes(
    (state) => state.setAnecdotes
  )

  useEffect(() => {
    getAll().then((anecdotes) => {
      setAnecdotes(anecdotes)
    })
  }, [setAnecdotes])

  return (
    <div>
      <h2>Anecdotes</h2>

      <Notification />

      <Filter />

      <AnecdoteList />

      <h2>Create new</h2>

      <AnecdoteForm />
    </div>
  )
}

export default App