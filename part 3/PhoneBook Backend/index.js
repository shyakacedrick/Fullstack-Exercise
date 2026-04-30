console.log("making exercise........")

const express = require('express')
const app = express()
const morgan = require('morgan')

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})


app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


  let persons = [
        { 
          id: 1,
          name: "Arto Hellas", 
          number: "040-123456"
        },
        { 
          id: 2,
          name: "Ada Lovelace", 
          number: "39-44-5323523"
        },
        { 
          id: 3,
          name: "Dan Abramov", 
          number: "12-43-234345"
        },
        { 
          id: 4,
          name: "Mary Poppendieck", 
          number: "39-23-6423122"
        }
    ]
    
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
    else res.status(404).json({error: "ID not found"})
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (!person) return res.status(404).json({error: "ID does not exist"})
  
    persons = persons.filter(p => p.id !== id)

    res.json(persons)
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) return res.status(400).json({error: "name or number missing"})

  const error = persons.some(p => p.name === body.name)

  if (error) return res.status(400).json({error: "name must be unique"})

  const id = Math.floor(Math.random() * 1000000)

  const newPerson = {
    id,
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)
  res.status(201).json(newPerson)
})



const PORT = 3001
app.listen(PORT, () => console.log(`server active on port ${PORT}`))