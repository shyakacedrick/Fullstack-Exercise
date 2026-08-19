require('dotenv').config()

const mongoose = require('mongoose')
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const User = require('./models/User')

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  // ===== EXERCISE 16: Convert a valid Bearer token into context.currentUser =====
  context: async ({ req }) => {
    const authorization = req.headers.authorization

    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
      return { currentUser: null }
    }

    try {
      const token = authorization.substring(7)
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    } catch (error) {
      return { currentUser: null }
    }
  },
  // ===== EXERCISE 16: End authentication context =====
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
