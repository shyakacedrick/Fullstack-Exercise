import { useEffect, useState, useRef } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import LogoutIcon from '@mui/icons-material/Logout'
import blogService from './services/blogs'
import loginService from './services/login'

import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Home from './components/Home'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './Pages/NotFound'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((returnedBlogs) => {
      setBlogs(returnedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

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
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      setUser(user)
      window.location.href = '/'
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
      const returnedBlog = await blogService.create(blogObject)

      blogFormRef.current.toggleVisibility()
      setBlogs((currentBlogs) => currentBlogs.concat(returnedBlog))

      const showNotification = (message, type = 'success') => {
        setNotification({ message, type })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }

      showNotification(`Blog "${returnedBlog.title}" added successfully`)
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

      setBlogs((currentBlogs) =>
        currentBlogs.map((blog) =>
          blog.id === returnedBlog.id ? returnedBlog : blog
        )
      )
    } catch {
      setNotification({
        message: 'Failed to like the blog',
        type: 'error',
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
      setBlogs((currentBlogs) =>
        currentBlogs.filter((blog) => blog.id !== blogToDelete.id)
      )
      setNotification({
        message: 'Blog deleted successfully',
        type: 'success',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch {
      setNotification({
        message: 'Failed to delete blog',
        type: 'error',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Home
                blogs={blogs}
                user={user}
                blogFormRef={blogFormRef}
                createBlog={createBlog}
                handleLike={handleLike}
                handleDelete={handleDelete}
                handleLogout={handleLogout}
                Notification={Notification}
                notification={notification}
                BlogForm={BlogForm}
                Blog={Blog}
                Togglable={Togglable}
                LogoutIcon={LogoutIcon}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            <div className="app-shell">
              <section className="centered-card">
                <div style={{ marginBottom: '1rem' }}>
                  <span className="brand">BlogList</span>

                  <span className="brand-sub">Personal blogs · simple CMS</span>
                </div>

                <Notification message={notification} />

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
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
