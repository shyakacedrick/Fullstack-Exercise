import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <nav
      style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
      }}
    >
      <Link to="/">Blogs</Link>

      <Link to="/users">Users</Link>
    </nav>
  )
}

export default Menu