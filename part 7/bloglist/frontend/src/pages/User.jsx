import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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

      <h2>{user.name}</h2>

      <h3>Added blogs</h3>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User