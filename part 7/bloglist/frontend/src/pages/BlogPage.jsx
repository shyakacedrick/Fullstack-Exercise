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

      <h2>
        {blog.title} {blog.author}
      </h2>

      <a
        href={blog.url}
        target="_blank"
        rel="noreferrer"
      >
        {blog.url}
      </a>

      <p>
        <strong>{blog.likes}</strong> likes
      </p>

      <h3>Add comment</h3>

      <form onSubmit={handleSubmit}>
        <input
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          placeholder="Write a comment..."
        />

        <button type="submit">
          Add comment
        </button>
      </form>

      <h3>Comments</h3>

      {blog.comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>
              {comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BlogPage