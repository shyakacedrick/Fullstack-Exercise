import {useState, useEffect} from 'react'
import personService from '/src/services/persons.js'
import './index.css'
import PersonList from './components/PersonList'
import Form from './components/form'

const Filter = ({value, onChange}) => (
  <input 
    className='val5'
    value={value} 
    onChange={onChange} 
    placeholder="Search name" 
  />
)
const App = () => {
  const [persons, setPersons] = useState([])
  const [newNote, setNewNote] = useState('')
  const [yearOfBirth, setYearOfBirth] = useState('')
  const [newQuote, setNewQuote] = useState('')
  const [filter, setFilter] = useState ('')

  useEffect(() => {
      personService.getAll().then(data => {
      setPersons(data)
        })}, [])

  const AddName = (e) => {
    e.preventDefault()
    
    const duplicate = persons.find(n => n.name.toLowerCase() === newNote.toLowerCase())
    if (duplicate) { alert( `${newNote} already exist in the PhoneBook`); return }

    const addedNote = {
      name: newNote,
      quote: newQuote,
      yearOfBirth: yearOfBirth,
      isSingle: Math.random() > 0.5,
    }

      personService.create(addedNote).then(data => {
      setPersons(persons.concat(data))
      setNewNote('')
      setNewQuote('')
      setYearOfBirth('')
    })
    
    console.table(addedNote)
  }

  const noteHandler = (e) => setNewNote(e.target.value)
  const quoteHandler = (e) =>  setNewQuote(e.target.value)
  const yearHandler = (e) =>  setYearOfBirth(e.target.value)

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
      if (window.confirm(`Delete ${person.name}?`)) {
        personService.remove(id).then(() => {
          setPersons(persons.filter(p => p.id !== id))
      })
    }
  }
   
  const handleSearch = (e)=>{ setFilter(e.target.value); console.log(e.target.value)}
  const filteredPersons = persons.filter(note => note.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className='parent'>

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