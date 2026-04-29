console.log("making exercise........")

const express = require('express')
const app = express()

const morgan = require('morgan')
app.use(morgan('dev'))


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








const PORT = 3001
app.listen(PORT, () => console.log(`server active on port ${PORT}`))