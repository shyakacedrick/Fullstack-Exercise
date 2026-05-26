const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((favorite, current) => {
    return current.likes > favorite.likes
      ? current
      : favorite
  })
}

const mostBlogs = (blogs) => {
  const authors = {}

  blogs.forEach(blog => {
    authors[blog.author] = (authors[blog.author] || 0) + 1
  })

  let topAuthor = ''
  let maxBlogs = 0

  for (const author in authors) {
    if (authors[author] > maxBlogs) {
      maxBlogs = authors[author]
      topAuthor = author
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
