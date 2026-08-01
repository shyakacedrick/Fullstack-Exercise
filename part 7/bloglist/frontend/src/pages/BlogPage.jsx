import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import blogService from '../services/blogs'
import Menu from '../components/Menu'

const BlogPage = () => {
  const { id } = useParams()

  const [blog, setBlog] = useState(null)

  useEffect(() => {
    blogService.getById(id).then((returnedBlog) => {
      setBlog(returnedBlog)
    })
  }, [id])

  if (!blog) {
    return <div className="container">Loading...</div>
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

      <h3>Comments</h3>

      {blog.comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BlogPage