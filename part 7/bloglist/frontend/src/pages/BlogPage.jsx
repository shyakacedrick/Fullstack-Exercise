import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import blogService from '../services/blogs'
import Menu from '../components/Menu'

const BlogPage = () => {
  const { id } = useParams()

  const [blog, setBlog] = useState(null)
  const [comment, setComment] = useState('')

  const loadBlog = async () => {
    const returnedBlog = await blogService.getById(id)
    setBlog(returnedBlog)
  }

  useEffect(() => {
    loadBlog()
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!comment.trim()) {
      return
    }

    await blogService.addComment(id, comment)

    setComment('')

    await loadBlog()
  }

  if (!blog) {
    return (
      <div className="container">
        <Menu />
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container">
      <Menu />

      <div className="card page-card">
        <h2>{blog.title}</h2>
        <p className="page-subtitle">by {blog.author}</p>

        <a
          href={blog.url}
          target="_blank"
          rel="noreferrer"
          className="blog-url"
        >
          {blog.url}
        </a>

        <div className="likes-pill">👍 {blog.likes} likes</div>

        <div className="card" style={{ padding: '1rem' }}>
          <h3>Add comment</h3>

          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
            />

            <button className="btn btn-primary" type="submit">
              Add comment
            </button>
          </form>
        </div>

        <div>
          <h3>Comments</h3>

          {blog.comments.length === 0 ? (
            <p className="page-subtitle">No comments yet.</p>
          ) : (
            <ul className="blog-list">
              {blog.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
