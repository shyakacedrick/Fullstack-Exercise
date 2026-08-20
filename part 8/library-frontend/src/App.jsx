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
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" onClick={() => setPage('authors')} aria-label="Shelfmark home">
          <span className="brand-mark">S</span>
          <span><strong>Shelfmark</strong><small>the considered library</small></span>
        </button>
        {/* ===== UI REDESIGN: Responsive, state-aware primary navigation ===== */}
        <nav className="main-nav" aria-label="Main navigation">
          <button className={`nav-link ${page === 'authors' ? 'is-active' : ''}`} onClick={() => setPage('authors')}>authors</button>
          <button className={`nav-link ${page === 'books' ? 'is-active' : ''}`} onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button className={`nav-link ${page === 'add' ? 'is-active' : ''}`} onClick={() => setPage('add')}>add book</button>
            {/* ===== EXERCISE 21: Recommendations are available to logged-in users ===== */}
            <button className={`nav-link ${page === 'recommend' ? 'is-active' : ''}`} onClick={() => setPage('recommend')}>recommend</button>
            <button className="nav-link nav-link--quiet" onClick={logout}>logout</button>
          </>
        ) : (
          <button className={`nav-link nav-link--login ${page === 'login' ? 'is-active' : ''}`} onClick={() => setPage('login')}>login</button>
        )}
        </nav>
      </header>

      <main className="content-wrap">
        <Authors show={page === 'authors'} token={token} />

        <Books show={page === 'books'} />

        <NewBook show={page === 'add' && Boolean(token)} />

        <Recommend show={page === 'recommend' && Boolean(token)} />

        <Login
          show={page === 'login'}
          setToken={setToken}
          setPage={setPage}
        />
      </main>

      <footer className="site-footer"><span>© 2026 Shelfmark</span><span>Curated stories, one shelf at a time.</span></footer>
    </div>
  )
}

export default App
