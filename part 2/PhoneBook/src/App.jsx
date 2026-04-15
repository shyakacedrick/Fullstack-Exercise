import {useState, useEffect} from 'react'
import personService from '/src/services/persons.js'
import './index.css'
import PersonList from './components/PersonList'
import Form from './components/form'
import Notification from './components/notification'

const Filter = ({value, onChange}) => (
  <input 
    className='val5'
    value={value} 
    onChange={onChange} 
    placeholder="Search name" 
  />)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newNote, setNewNote] = useState('')
  const [yearOfBirth, setYearOfBirth] = useState('')
  const [newQuote, setNewQuote] = useState('')
  const [filter, setFilter] = useState ('')

  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

    useEffect(() => {
      personService.getAll().then(data => {
      setPersons(data)
      })
    }, [])

    const AddName = (e) => {
      e.preventDefault()

      const duplicate = persons.find(p => p.name.toLowerCase() === newNote.toLowerCase())

        if (duplicate) {
          const confirmUpdate = window.confirm(
            `${duplicate.name} is already added. Replace the old data?`
          )
        
          if (confirmUpdate) {
            const updatedPerson = {
              ...duplicate,
              quote: newQuote,
              yearOfBirth: yearOfBirth
            }
          
            personService
              .update(duplicate.id, updatedPerson)
              .then(returnedPerson => {
                setPersons(persons.map(p =>
                  p.id !== duplicate.id ? p : returnedPerson
                ))

                setMessage(`${duplicate.name} updated successfully`)
                setType('success')
                setTimeout(() => setMessage(null), 3000)

                setNewNote('')
                setNewQuote('')
                setYearOfBirth('')
              })
              .catch((error) => {
                console.log(error)
                setMessage(`${duplicate.name} was already removed from server`)
                setType('error')
          
                setPersons(persons.filter(p => p.id !== duplicate.id))
                
                setTimeout(() =>{
                  setMessage(null)
                  setType(null)
                }, 3000)
              })
          }
          return
        }
    
      const addedNote = {
        name: newNote,
        quote: newQuote,
        yearOfBirth: yearOfBirth
      }

      personService.create(addedNote).then(data => {
        setPersons(persons.concat(data))
        setMessage(`${newNote} added successfully`)
        setType('success')
        setTimeout(() => setMessage(null), 3000)
        setNewNote('')
        setNewQuote('')
        setYearOfBirth('')
      })
    }

    const noteHandler = (e) => setNewNote(e.target.value)
    const quoteHandler = (e) =>  setNewQuote(e.target.value)
    const yearHandler = (e) =>  setYearOfBirth(e.target.value)

    const handleDelete = (id) => {
      const person = persons.find(p => p.id === id)
        if (window.confirm(`Delete ${person.name}?`)) {
          personService
            .remove(id)
            .then(() => {
              setPersons(persons.filter(p => p.id !== id))
              setMessage(`${person.name} deleted`)
              setType('error')
              setTimeout(() => setMessage(null), 3000)
            })
            .catch(() => {
              setMessage(`${person.name} was already removed from server`)
              setType('error')
              setPersons(persons.filter(p => p.id !== id))
              setTimeout(() => setMessage(null), 3000)
            })
      }
    }

    const handleSearch = (e)=>{ setFilter(e.target.value); console.log(e.target.value)}
    const filteredPersons = persons.filter(note => note.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className='parent'>

        <Notification message={message} type={type} />

      <div className='filter'>
        <Filter value={filter} onChange={handleSearch}/>
      </div>

      <div className='form'>
        <h1 id='title'>PhoneBook</h1>
        <Form 
          onSubmit={AddName} 
          noteValue={newNote} quoteValue={newQuote} yearValue={yearOfBirth} 
          noteHandler={noteHandler} quoteHandler={quoteHandler} yearHandler={yearHandler}
        />
      </div>
      
      <div className='names'>
        <h2>Names</h2>
        <PersonList persons={filteredPersons} onDelete={handleDelete}/>
      </div>
    </div>
  )
}

export default App