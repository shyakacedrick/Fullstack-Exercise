import { useEffect, useRef } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import './App.css'

import useField from './hooks/useField'

import loginService from './services/login'

import useBlogStore from './stores/blogStore'
import useUserStore from './stores/userStore'
import useNotificationStore from './stores/notificationStore'

import Menu from './components/Menu'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Home from './components/Home'
import ErrorBoundary from './components/ErrorBoundary'

import Users from './pages/Users'
import User from './pages/User'
import BlogPage from './pages/BlogPage'
import NotFound from './Pages/NotFound'

import LogoutIcon from '@mui/icons-material/Logout'

const App = () => {
  const navigate = useNavigate()

  const username = useField('text')
  const password = useField('password')

  const blogFormRef = useRef()

  // BLOG STORE
  const blogs = useBlogStore((state) => state.blogs)
  const initializeBlogs = useBlogStore((state) => state.initializeBlogs)
  const createBlogStore = useBlogStore((state) => state.createBlog)
  const likeBlogStore = useBlogStore((state) => state.likeBlog)
  const deleteBlogStore = useBlogStore((state) => state.deleteBlog)

  // USER STORE
  const user = useUserStore((state) => state.user)
  const initializeUser = useUserStore((state) => state.initializeUser)
  const login = useUserStore((state) => state.login)
  const logout = useUserStore((state) => state.logout)

  // NOTIFICATION STORE
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  )

  useEffect(() => {
    initializeBlogs()
  }, [initializeBlogs])

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({
        username: username.input.value,
        password: password.input.value,
      })

      login(loggedUser)

      showNotification(
        `Welcome ${
          loggedUser.name || loggedUser.username
        }!`,
        'success'
      )

      username.reset()
      password.reset()

      navigate('/')
    } catch {
      showNotification(
        'Wrong username or password',
        'error'
      )
    }
  }

  const handleLogout = () => {
    logout()
  
    showNotification(
      'Logged out successfully',
      'success'
    )
  
    navigate('/login')
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog =
        await createBlogStore(blogObject)

      blogFormRef.current.toggleVisibility()

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

  const handleLike = async (blog) => {
    try {
      await likeBlogStore(blog)

      showNotification(
        'Blog liked successfully',
        'success'
      )
    } catch {
      showNotification(
        'Failed to like the blog',
        'error'
      )
    }
  }

  const handleDelete = async (blog) => {
    const ok = window.confirm(
      `Remove blog "${blog.title}" by ${blog.author}?`
    )

    if (!ok) return

    try {
      await deleteBlogStore(blog)

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
          path="/users"
          element={
            user ? (
              <Users />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

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
            user ? (
              <Navigate
                to="/"
                replace
              />
            ) : (
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
                    handleLogin={handleLogin}
                  />
                </section>
              </div>
            )
          }
        />

        <Route
          path="/users/:id"
          element={
            user ? (
              <User />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/blogs/:id"
          element={
            user ? (
              <BlogPage />
            ) : (
              <Navigate to="/login" replace />
            )
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