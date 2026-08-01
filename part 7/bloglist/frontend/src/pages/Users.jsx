import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'
import Menu from '../components/Menu'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

  return (
    <div className="container">
      <Menu />

      <h1 className="page-title">Users</h1>
      <p className="page-subtitle">
        Browse authors and see how much each person has shared.
      </p>

      <div className="card">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Blogs created</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>

                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
