import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import userService from '../services/users'
import Menu from '../components/Menu'

const User = () => {
  const [user, setUser] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    userService.getAll().then((users) => {
      const foundUser = users.find((u) => u.id === id)
      setUser(foundUser)
    })
  }, [id])

  if (!user) {
    return <div className="container">Loading...</div>
  }

  return (
    <div className="container">
      <Menu />

      <h1 className="page-title">{user.name}</h1>
      <p className="page-subtitle">
        This author has contributed the following posts.
      </p>

      <div className="card page-card">
        <h3>Added blogs</h3>

        <ul className="blog-list">
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default User
