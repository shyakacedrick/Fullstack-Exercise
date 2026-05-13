const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')

app.use(cors())

morgan.token('body', (req) => {
  if (req.method === 'POST' || req.method === 'PUT') return JSON.stringify(req.body)
  return ''
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

const normalizePerson = (body = {}) => ({
  name: typeof body.name === 'string' ? body.name.trim() : '',
  number: body.number === undefined || body.number === null ? '' : String(body.number).trim()
})

const normalizeName = (name) => name.trim().toLowerCase()

const hasDuplicateName = (name, currentId) =>
  persons.some(person =>
    person.id !== currentId && normalizeName(person.name) === normalizeName(name)
  )

const generateId = () => Math.max(...persons.map(person => person.id), 0) + 1

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  const validPeople = persons.length
  const date = new Date()

  res.send(`
    <p>Phonebook has info for ${validPeople} people</p>
    <p>${date}</p>
    `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})
    

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) res.json(person)
  else res.status(404).json({ error: 'ID not found' })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (!person) return res.status(404).json({ error: 'ID does not exist' })
  
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const { name, number } = normalizePerson(req.body)
  if (!name || !number) return res.status(400).json({ error: 'name or number missing' })

  if (hasDuplicateName(name)) return res.status(400).json({ error: 'name must be unique' })

  const newPerson = {
    id: generateId(),
    name,
    number
  }

  persons = persons.concat(newPerson)
  res.status(201).json(newPerson)
})

app.put('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (!person) return res.status(404).json({ error: 'ID does not exist' })

  const { name, number } = normalizePerson(req.body)
  if (!name || !number) return res.status(400).json({ error: 'name or number missing' })

  if (hasDuplicateName(name, id)) return res.status(400).json({ error: 'name must be unique' })

  const updatedPerson = { ...person, name, number }
  persons = persons.map(p => p.id !== id ? p : updatedPerson)

  res.json(updatedPerson)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`server active on port ${PORT}`))