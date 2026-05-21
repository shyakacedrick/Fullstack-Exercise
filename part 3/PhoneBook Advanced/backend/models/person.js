const mongoose = require('mongoose')
require('dotenv').config()

const password = process.argv[2]  //============ COMMAND LINE ARGUMENTS ============
mongoose.set('strictQuery',false) //============ DEPRECATED WARNING FIX ============

const url = process.env.MONGODB_URI
console.log('connecting to', url)


mongoose.connect(url, { family: 4 })
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v) && v.length >= 8;
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
})


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v 
  }
})

const Person = mongoose.model('Person', personSchema)


module.exports = mongoose.model('Person', personSchema)
