
const Blog = ({ blog }) => {
  return (
    <article className="card blog-card" aria-label={`Blog ${blog.title}`}>
      <div>
        <h3 className="blog-title">{blog.title}</h3>
        <div className="blog-meta">
          <span>{blog.author}</span>
          {blog.url ? (
            <a className="blog-url" href={blog.url} target="_blank" rel="noreferrer">Visit</a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default Blog