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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

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

  return (
    <main className="blog-list">
      <h2>Blogs</h2>

      <p>{user.name} logged in</p>

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </main>
  )
}

export default App



