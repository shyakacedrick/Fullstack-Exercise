import { useState } from "react"

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? "none" : ""}
  const showWhenVisible = { display: visible ? "" : "none"}

  
  const toggleVisibility = () => { setVisible(!visible) }

  const blogOwner =
    typeof blog.user === "object"
      ? blog.user.username
      : null
  const canDelete =
    currentUser &&
    blogOwner === currentUser.username

  return (
  <article className="card blog-card" aria-label={`Blog ${blog.title}`}>
    {/* Collapsed View */}
    <div style={hideWhenVisible}>
      <h3 className="blog-title">{blog.title}</h3>
      <div className="blog-meta">
        <span>{blog.author}</span>
        <button className="btn btn-secondary" onClick={toggleVisibility}>
          View
        </button>
      </div>
    </div>

    {/* Expanded View */}
    <div style={showWhenVisible}>
      <h3 className="blog-title">{blog.title}</h3>
      <div className="blog-meta">
        <span>{blog.author}</span>
        <button className="btn btn-secondary" onClick={toggleVisibility}>
          Hide
        </button>
      </div>

      {blog.url && (
        <p>
          <strong>URL:</strong>{" "}
          <a className="blog-url" href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </p>
      )}

      <p>
        <strong>Likes:</strong> {blog.likes}
          <button className="secondary-btn" onClick={() => handleLike(blog)}>
            👍 Like
          </button>
      </p>

      {canDelete && (
        <button className="btn btn-danger" onClick={() => handleDelete(blog)}>
          Remove
        </button>
      )}

      <p>
        <strong>Added by:</strong> {blog.user?.name || "Unknown"}
      </p>
    </div>
  </article>
)
}

export default Blog
