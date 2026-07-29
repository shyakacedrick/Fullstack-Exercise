const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})


blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).end()
    }

    if (!blog.user || blog.user.toString() !== user.id.toString()) {
      return res.status(401).json({ error: 'not allowed' })
    }

    await Blog.findByIdAndDelete(req.params.id)

    user.blogs = user.blogs.filter(savedBlog => savedBlog.toString() !== blog.id)
    await user.save()

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    {
      returnDocument: 'after',
      runValidators: true,
      context: 'query'
    }
  )

  response.json(updatedBlog)
})

module.exports = blogsRouter