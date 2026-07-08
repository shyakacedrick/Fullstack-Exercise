import { useEffect, useState } from 'react'

import './App.css'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
  blogService
    .getAll()
    .then(returnedBlogs => {
      setBlogs(returnedBlogs)
    })
  }, [])

  useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem(
    'loggedBlogAppUser'
  )

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
  }
}, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      // Save to browser
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      alert('Wrong username or password')
    }
  }

  if (user === null) {
    return (
      <div className="app-shell">
        <section className="centered-card">
          <h2>Log in</h2>

          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </section>
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  return (
    <main className="blog-list">
      <h2>Blogs</h2>

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>
          Logout
        </button>
      </p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </main>
  )
}

export default App



