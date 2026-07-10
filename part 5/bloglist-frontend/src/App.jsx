import { useEffect, useState } from 'react'

import './App.css'
import blogService from './services/blogs'
import loginService from './services/login'

import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)


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
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      
      blogService.setToken(user.token)

      // Save to browser
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(user)
      )

      setUser(user)
      const displayName = user?.name || user?.username || user?.email || 'user'
      setNotification({ message: `Welcome ${displayName}!`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch {
      setNotification({ message: 'Wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div className="app-shell">
        <section className="centered-card">
          <div style={{ marginBottom: '1rem' }}>
            <span className="brand">BlogList</span>
            <span className="brand-sub">Personal blogs · simple CMS</span>
          </div>
          <Notification message={notification} />
          <h2 style={{ marginTop: '0.5rem' }}>Log in</h2>

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

    setNotification({ message: 'Logged out successfully', type: 'success' })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const createBlog = async (blogObject) => {
  try {
    const returnedBlog =
      await blogService.create(blogObject)

    setBlogs( blogs.concat(returnedBlog) )
    setNotification({ message: `Blog "${returnedBlog.title}" added successfully`, type: 'success' })
    setTimeout(() => {
      setNotification(null)
    }, 5000)

  } catch {
      setNotification({ message: 'Failed to create blog', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
}

const handleLike = async (blogToUpdate) => {
  try {
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
      user: blogToUpdate.user.id || blogToUpdate.user,
    }

    const returnedBlog = await blogService.update(
      blogToUpdate.id,
      updatedBlog
    )

setBlogs(currentBlogs =>
  currentBlogs.map(blog =>
    blog.id === returnedBlog.id
      ? returnedBlog
      : blog
  )
)
  } catch {
    setNotification({
      message: "Failed to like the blog",
      type: "error",
    })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
}

const handleDelete = async (blogToDelete) => {
  const confirmDelete = window.confirm(
    `Remove blog "${blogToDelete.title}" by ${blogToDelete.author}?`
  )

  if (!confirmDelete) {
    return
  }

  try {
    await blogService.remove(blogToDelete.id)
    setBlogs(currentBlogs =>
      currentBlogs.filter(
        blog => blog.id !== blogToDelete.id
      )
    )
    setNotification({
      message: "Blog deleted successfully",
      type: "success",
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  } catch {
    setNotification({
      message: "Failed to delete blog",
      type: "error",
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
}

  return (
    <div className="container">
      <div className="topbar">
        <div>
          <span className="brand">BlogList</span>
          <span className="brand-sub">Personal blogs · simple CMS</span>
        </div>

        <div className="actions">
          <span style={{ color: 'var(--text-secondary)', fontWeight:600 }}>{user.name || user.username || 'user'}</span>
          <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <Notification message={notification} />

      <h1 className="page-title">Blogs</h1>

      <Togglable buttonLabel="New Blog">
        <div className="card">
          <BlogForm createBlog={createBlog} />
        </div>
      </Togglable>
      
      <div className="blog-grid">
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} currentUser={user}/>
        ))}
      </div>
    </div>
  )
}

export default App



