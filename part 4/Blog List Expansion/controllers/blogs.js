const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  res.json(blogs)
})



blogsRouter.post('/', async (req, res) => {
  const decoded = jwt.verify(req.token, process.env.SECRET)

  const user = await User.findById(decoded.id)

  const blog = new Blog({
    ...req.body,
    user: user._id
  })

  const saved = await blog.save()

  user.blogs = user.blogs.concat(saved._id)
  await user.save()

  res.status(201).json(saved)
})








blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
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