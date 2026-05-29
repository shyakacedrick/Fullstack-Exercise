const logger = require('./logger')

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
  unknownEndpoint,
  errorHandler
}