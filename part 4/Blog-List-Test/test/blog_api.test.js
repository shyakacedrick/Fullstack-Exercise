const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
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

  await api
    .post('/api/blogs')
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

test('if likes property missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'No Likes Blog',
    author: 'Anonymous',
    url: 'https://example.com'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  assert.strictEqual(response.body.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})