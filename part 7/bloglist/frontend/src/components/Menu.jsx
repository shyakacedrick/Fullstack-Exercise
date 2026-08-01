import { NavLink } from 'react-router-dom'

const Menu = () => {
  return (
    <nav className="app-nav" aria-label="Primary">
      <NavLink
        to="/"
        className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
      >
        Blogs
      </NavLink>

      <NavLink
        to="/users"
        className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
      >
        Users
      </NavLink>
    </nav>
  )
}

export default Menu
