const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')

  next()
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')

  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '')
  }

  next()
}

const userExtractor = async (req, res, next) => {
  try {
    if (!req.token) {
      req.user = null
      return next()
    }

    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!decodedToken.id) {
      req.user = null
      return next()
    }

    req.user = await User.findById(decodedToken.id)

    next()
  } catch (error) {
    next(error)
  }
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'token invalid'
    })
  }

  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}