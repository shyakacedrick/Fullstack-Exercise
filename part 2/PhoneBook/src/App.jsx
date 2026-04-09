import React, {useState} from 'react'
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
  const [persons, setPersons] = useState([
    {id: 1, name: 'Christiano', quote: 'Talent without working hard is nothing.', yearOfBirth: 1987, isSingle: false},
    {id: 2, name: 'Ronaldinho', quote: 'I learned all about life with a ball at my feet.', yearOfBirth: 1980, isSingle: true},
    {id: 3, name: 'Messi', quote: 'I\'m more worried about being a good person than being the best football player in the world.', yearOfBirth: 1985, isSingle: true},
    {id: 4, name: 'Mbappe', quote: 'It\'s not over until I win', yearOfBirth: 1998, isSingle: true},
  ])
  
  const [newNote, setNewNote] = useState('')
  const [yearOfBirth, setYearOfBirth] = useState('')
  const [newQuote, setNewQuote] = useState('')
  const [filter, setFilter] = useState ('')

  const AddName = (e) => {
    e.preventDefault()
    
    const duplicate = persons.find(n => n.name.toLowerCase() === newNote.toLowerCase())
    if (duplicate) { alert( `${newNote} already exist in the PhoneBook`); return }

    const addedNote = {
      id: String(Date.now()),
      name: newNote,
      quote: newQuote,
      yearOfBirth: yearOfBirth,
      isSingle: Math.random() > 0.5,
    }

    setPersons([...persons, addedNote])
    setNewNote('')
    setNewQuote('')
    setYearOfBirth('')

    console.table(addedNote)
  }

  const noteHandler = (e) => setNewNote(e.target.value)
  const quoteHandler = (e) =>  setNewQuote(e.target.value)
  const yearHandler = (e) =>  setYearOfBirth(e.target.value)
   
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
        <PersonList persons={filteredPersons}/>
      </div>
    </div>
  )
}

export default App