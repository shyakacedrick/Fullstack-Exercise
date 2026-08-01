import useField from '../hooks/useField'

const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()

    createBlog({
      title: title.input.value,
      author: author.input.value,
      url: url.input.value,
    })

    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      aria-label="Create blog form"
    >
      <div className="form-group">
        <label className="label" htmlFor="title">
          Title
        </label>

        <input
          id="title"
          className="input"
          placeholder="My new blog post"
          {...title.input}
        />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="author">
          Author
        </label>

        <input
          id="author"
          className="input"
          placeholder="Author name"
          {...author.input}
        />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="url">
          URL
        </label>

        <input
          id="url"
          className="input"
          placeholder="https://example.com/article"
          {...url.input}
        />
      </div>

      <button
        className="btn btn-primary"
        type="submit"
      >
        Create
      </button>
    </form>
  )
}

export default BlogForm