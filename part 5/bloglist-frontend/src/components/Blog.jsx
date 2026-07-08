
const Blog = ({ blog }) => {
  return (
    <div
      style={{
        padding: 8,
        border: '1px solid #ccc',
        marginBottom: 8,
      }}
    >
      <strong>{blog.title}</strong>

      <div>{blog.author}</div>
    </div>
  )
}

export default Blog