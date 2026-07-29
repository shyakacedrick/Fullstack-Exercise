const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

process.env.SECRET = process.env.SECRET || 'testsecret'

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')

const api = supertest(app)

let authHeader

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)

  const user = new User({
    username: 'testuser',
    name: 'Test User',
    passwordHash
  })

  const savedUser = await user.save()

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog({
      ...blog,
      user: savedUser._id
    })

    const savedBlog = await blogObject.save()

    savedUser.blogs = savedUser.blogs.concat(savedBlog._id)
  }

  await savedUser.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'sekret' })

  authHeader = `Bearer ${loginResponse.body.token}`
})

describe('when there are initially some blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(
      response.body.length,
      helper.initialBlogs.length
    )
  })
})

test('blog posts have id property', async () => {
  const response = await api.get('/api/blogs')

  const blog = response.body[0]

  assert(blog.id)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Async/Await Guide',
    author: 'Cedric',
    url: 'https://example.com',
    likes: 15
  }

  const token = authHeader

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(
    response.body.length,
    helper.initialBlogs.length + 1
  )

  const titles = response.body.map(blog => blog.title)

  assert(titles.includes('Async/Await Guide'))
})

test('creating blog fails without token', async () => {
  const blogsAtStart = await Blog.find({})

  const newBlog = {
    title: 'No token blog',
    author: 'Test',
    url: 'http://example.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await Blog.find({})

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
})

test('if likes property missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'No Likes Blog',
    author: 'Anonymous',
    url: 'https://example.com'
  }

  const token = authHeader

  const response = await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Someone',
    url: 'https://example.com',
    likes: 5
  }

  const token = authHeader

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(400)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Missing URL',
    author: 'Someone',
    likes: 5
  }

  const token = authHeader

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(400)
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await Blog.find({})

    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', authHeader)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    const userAtEnd = await User.findOne({ username: 'testuser' })

    assert.strictEqual(
      blogsAtEnd.length,
      blogsAtStart.length - 1
    )

    assert(!userAtEnd.blogs.map(blog => blog.toString()).includes(blogToDelete.id))
  })

  test('a blog cannot be deleted by another user', async () => {
    const blogsAtStart = await Blog.find({})

    const blogToDelete = blogsAtStart[0]

    await api
      .post('/api/users')
      .send({
        username: 'anotheruser',
        name: 'Another User',
        password: 'secret123'
      })

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'anotheruser', password: 'secret123' })

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(401)

    const blogsAtEnd = await Blog.find({})

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })

  test('a blog cannot be deleted without a token', async () => {
    const blogsAtStart = await Blog.find({})

    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await Blog.find({})

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

describe('updating a blog', () => {
  test('likes of a blog can be updated', async () => {
    const blogsAtStart = await Blog.find({})

    const blogToUpdate = blogsAtStart[0]

    const updatedData = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 999
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 999)
  })
})

test('invalid user is rejected', async () => {
  const newUser = {
    username: 'ab',
    password: '12'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})