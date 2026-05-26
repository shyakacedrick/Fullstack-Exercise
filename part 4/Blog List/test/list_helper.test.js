const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)

  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('of bigger list is calculated right', () => {
    const blogs = [
      { likes: 5 },
      { likes: 10 },
      { likes: 7 }
    ]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 22)
  })
})

describe('favorite blog', () => {
  const blogs = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 17
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
  ]

  test('returns blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)

    assert.deepStrictEqual(result, blogs[1])
  })
})

describe('most blogs', () => {
  test('returns author with most blogs', () => {
    const blogs = [
      { author: 'Robert C. Martin' },
      { author: 'Robert C. Martin' },
      { author: 'Edsger W. Dijkstra' },
      { author: 'Robert C. Martin' }
    ]

    const result = listHelper.mostBlogs(blogs)

    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('returns author with most likes', () => {
    const blogs = [
      {
        author: 'Edsger W. Dijkstra',
        likes: 10
      },
      {
        author: 'Edsger W. Dijkstra',
        likes: 7
      },
      {
        author: 'Robert C. Martin',
        likes: 5
      }
    ]

    const result = listHelper.mostLikes(blogs)

    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})