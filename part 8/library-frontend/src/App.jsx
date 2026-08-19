import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  // ===== EXERCISE 19: Restore the user's login state after a page refresh =====
  const [token, setToken] = useState(
    () => localStorage.getItem('library-user-token'),
  )

  const logout = () => {
    localStorage.removeItem('library-user-token')
    setToken(null)
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            {/* ===== EXERCISE 21: Recommendations are available to logged-in users ===== */}
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add' && Boolean(token)} />

      <Recommend show={page === 'recommend' && Boolean(token)} />

      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
