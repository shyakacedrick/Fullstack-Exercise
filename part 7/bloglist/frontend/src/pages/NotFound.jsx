import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container not-found">
      <div className="card not-found-card">
        <p className="not-found-code">404</p>
        <h1 className="page-title">Page not found</h1>
        <p className="not-found-copy">
          The page you are looking for does not exist.
        </p>

        <Link to="/" className="btn btn-primary">
          Back to Blogs
        </Link>
      </div>
    </div>
  )
}

export default NotFound
