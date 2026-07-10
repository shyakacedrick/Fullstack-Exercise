import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? "none" : ""}
  const showWhenVisible = { display: visible ? "" : "none"}

  
  const toggleVisibility = () => { setVisible(!visible) }


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

      <p>
        <strong>Added by:</strong> {blog.user?.name || "Unknown"}
      </p>
    </div>
  </article>
)
}

export default Blog
