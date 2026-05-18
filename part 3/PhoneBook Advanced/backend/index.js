require('dotenv').config()
const mongoose = require('mongoose')
const Person = require('./models/person')

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  if (req.method === 'POST' || req.method === 'PUT') return JSON.stringify(req.body)
  return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const normalizePerson = (body = {}) => ({
  name: typeof body.name === 'string' ? body.name.trim() : '',
  number: body.number === undefined || body.number === null ? '' : String(body.number).trim()
})


app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = normalizePerson(req.body)

  if (!name || !number) return res.status(400).json({error: 'name or number missing'})
  
  const person = new Person({
    name,
    number
  })

  person.save()
    .then(savedPerson => {
      res.status(201).json(savedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
  .then(() => {
    res.status(204).end()
  })
  .catch(error => next(error))
})


const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') return res.status(400).send({ error: 'malformatted id' })

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`server active on port ${PORT}`))