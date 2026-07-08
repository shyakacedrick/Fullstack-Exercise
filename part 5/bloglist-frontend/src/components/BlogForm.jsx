import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  

  return (
    <form className="form" onSubmit={handleSubmit} aria-label="Create blog form">
      <div className="form-group">
        <label className="label" htmlFor="title">Title</label>
        <input id="title" className="input" value={title} onChange={({ target }) => setTitle(target.value)} placeholder="My new blog post" />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="author">Author</label>
        <input id="author" className="input" value={author} onChange={({ target }) => setAuthor(target.value)} placeholder="Author name" />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="url">URL</label>
        <input id="url" className="input" value={url} onChange={({ target }) => setUrl(target.value)} placeholder="https://example.com/article" />
      </div>

      <button className="btn btn-primary" type="submit">Create</button>
    </form>
  )
}

export default BlogForm