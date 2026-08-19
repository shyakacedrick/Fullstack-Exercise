const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),

    authorCount: async () => Author.countDocuments(),

    allBooks: async (root, args) => {
      let query = {}
    
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
    
        if (!author) {
          return []
        }
    
        query.author = author._id
      }
    
      if (args.genre) {
        query.genres = args.genre
      }
    
      return Book.find(query).populate('author')
    },

    allAuthors: async () => {
      return Author.find({})
    },

    // ===== EXERCISE 16: Return the user authenticated by the request token =====
    me: (root, args, context) => context.currentUser,
    // ===== EXERCISE 16: End me query =====
  },

  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root._id }),
  },

  Mutation: {
    // ===== EXERCISE 17: Reset data only in the isolated test environment =====
    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== 'test') {
        throw new GraphQLError('_resetDatabase is only available in test mode')
      }

      await Author.deleteMany({})
      await Book.deleteMany({})
      await User.deleteMany({})

      return true
    },
    // ===== EXERCISE 17: End test-only database reset =====

    // ===== EXERCISE 16: Only authenticated users may add books =====
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }

      try {
        let author = await Author.findOne({ name: args.author })

        if (!author) {
          author = new Author({
            name: args.author,
          })

          await author.save()
        }

        const book = new Book({
          title: args.title,
          published: args.published,
          author: author._id,
          genres: args.genres,
        })

        await book.save()

        return book.populate('author')
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
    },

    // ===== EXERCISE 16: Only authenticated users may edit authors =====
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }

      const author = await Author.findOne({
        name: args.name,
      })

      if (!author) {
        return null
      }

      author.born = args.setBornTo

      await author.save()

      return author
    },

    createUser: async (root, args) => {
      // ===== EXERCISE 16: Users share the course's hardcoded login password =====
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      try {
        return await user.save()
      } catch (error) {
        throw new GraphQLError('creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
          },
        })
      }
    },
    
    login: async (root, args) => {
      const user = await User.findOne({
        username: args.username,
      })
  
      // ===== EXERCISE 16: The exercise specifies one shared password: "secret" =====
      const passwordCorrect = args.password === 'secret'
  
      if (!user || !passwordCorrect) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return {
        value: jwt.sign(
          userForToken,
          process.env.JWT_SECRET
        ),
      }
    },

  },
}

module.exports = resolvers
