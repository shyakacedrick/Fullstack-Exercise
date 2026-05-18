const mongoose = require('mongoose')

const password = process.argv[2]


mongoose.set('strictQuery', false)

const URI = `mongodb+srv://shyaka:${password}@cluster1.fnihgp4.mongodb.net/commandLine?retryWrites=true&w=majority&appName=Cluster1`
mongoose.connect(URI, {family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')

    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })

    mongoose.connection.close()
  })
}


if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name,
    number,
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}








