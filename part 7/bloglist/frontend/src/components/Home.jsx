import Menu from './Menu'

const Home = ({
  blogs,
  user,
  blogFormRef,
  createBlog,
  handleLike,
  handleDelete,
  handleLogout,
  Notification,
  BlogForm,
  Blog,
  Togglable,
  LogoutIcon,
}) => {
  return (
    <div className="container">
      <Menu />
      <div className="topbar">
        <div>
          <span className="brand">BlogList</span>

          <span className="brand-sub">Personal blogs · simple CMS</span>
        </div>

        <div className="actions">
          <span
            style={{
              color: 'var(--text-secondary)',
              fontWeight: 600,
            }}
          >
            {user.name || user.username}
          </span>

          <button className="btn btn-secondary" onClick={handleLogout}>
            <LogoutIcon />
            Logout
          </button>
        </div>
      </div>

      <Notification />

      <h1 className="page-title">Blogs</h1>

      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <div className="card">
          <BlogForm createBlog={createBlog} />
        </div>
      </Togglable>

      <div className="blog-grid">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
              currentUser={user}
            />
          ))}
      </div>
    </div>
  )
}

export default Home
