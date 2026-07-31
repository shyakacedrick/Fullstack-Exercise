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

import useNotificationStore from './stores/notificationStore'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const showNotification = useNotificationStore(
    (state) => state.showNotification
  )

  useEffect(() => {
    blogService.getAll().then((returnedBlogs) => {
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
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(user)
      )

      setUser(user)

      const displayName =
        user?.name ||
        user?.username ||
        user?.email ||
        'user'

      showNotification(
        `Welcome ${displayName}!`,
        'success'
      )

      setUsername('')
      setPassword('')

      window.location.href = '/'
    } catch {
      showNotification(
        'Wrong username or password',
        'error'
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(
      'loggedBlogAppUser'
    )

    setUser(null)

    showNotification(
      'Logged out successfully',
      'success'
    )
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog =
        await blogService.create(blogObject)

      blogFormRef.current.toggleVisibility()

      setBlogs((currentBlogs) =>
        currentBlogs.concat(returnedBlog)
      )

      showNotification(
        `Blog "${returnedBlog.title}" added successfully`,
        'success'
      )
    } catch {
      showNotification(
        'Failed to create blog',
        'error'
      )
    }
  }

  const handleLike = async (blogToUpdate) => {
    try {
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
        user:
          blogToUpdate.user.id ||
          blogToUpdate.user,
      }

      const returnedBlog =
        await blogService.update(
          blogToUpdate.id,
          updatedBlog
        )

      setBlogs((currentBlogs) =>
        currentBlogs.map((blog) =>
          blog.id === returnedBlog.id
            ? returnedBlog
            : blog
        )
      )

      showNotification(
        `You liked "${returnedBlog.title}"`,
        'success'
      )
    } catch {
      showNotification(
        'Failed to like the blog',
        'error'
      )
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
        currentBlogs.filter(
          (blog) =>
            blog.id !== blogToDelete.id
        )
      )

      showNotification(
        'Blog deleted successfully',
        'success'
      )
    } catch {
      showNotification(
        'Failed to delete blog',
        'error'
      )
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
                BlogForm={BlogForm}
                Blog={Blog}
                Togglable={Togglable}
                LogoutIcon={LogoutIcon}
              />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        <Route
          path="/login"
          element={
            <div className="app-shell">
              <section className="centered-card">
                <div
                  style={{
                    marginBottom: '1rem',
                  }}
                >
                  <span className="brand">
                    BlogList
                  </span>

                  <span className="brand-sub">
                    Personal blogs · simple CMS
                  </span>
                </div>

                <Notification />

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

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </ErrorBoundary>
  )
}

export default App