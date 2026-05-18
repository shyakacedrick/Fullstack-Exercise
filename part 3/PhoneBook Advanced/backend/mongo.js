require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

mongoose.set('strictQuery',false)

mongoose.connect(process.env.MONGODB_URI, {family: 4 })

const personSchema = new mongoose.Schema({

    name: String,
    number: String,
})

const Person = mongoose.model('person', personSchema)

const note = new Person({
  
  name: 'GitHub',
  number: '123-456-7890',
})

note.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})


Person.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})