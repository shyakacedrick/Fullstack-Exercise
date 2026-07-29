const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')


const app = express()

mongoose.connect(config.MONGODB_URI, { family: 4 })
.then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })
  
  app.use(express.json())
  app.use(
  express.static(
      path.join(__dirname, '../frontend/dist')
    )
  )
  app.use(middleware.tokenExtractor)
  app.use(middleware.requestLogger)
  
  app.use('/api/blogs', middleware.userExtractor, blogsRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') { 
  app.use('/api/testing', testingRouter) 
}

app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, '../frontend/dist/index.html')
  )
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app