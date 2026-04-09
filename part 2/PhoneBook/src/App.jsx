import React, {useState} from 'react'

const App = () => {
  const [notes, setNote] = useState([
    {id: 1, name: 'Ronaldinho', content: 'I learned all about life with a ball at my feet.', yearOfBirth: 1980, isSingle: true},
    {id: 2, name: 'Messi', content: 'I\'m more worried about being a good person than being the best football player in the world.', yearOfBirth: 1985, isSingle: false},
    {id: 3, name: 'Christiano', content: 'Talent without working hard is nothing.', yearOfBirth: 1987, isSingle: false},
    {id: 4, name: 'Mbappe', content: 'It\'s not over until I win', yearOfBirth: 1998, isSingle: true},
  ])
  
  const [newNote, setNewNote] = useState('')
  const [newContent, setNewContent] = useState('')
  const [yearOfBirth, setNumber] = useState('')
  const [filter, setFilter] = useState ('')

  const AddName = (e) => {
    e.preventDefault()
    
    const duplicate = notes.find(n => n.name.toLowerCase() === newNote.toLowerCase())
    if (duplicate) { alert( `${newNote} already exist in the PhoneBook`); return }

    const addedNote = {
      id: String(Date.now()),
      name: newNote,
      content: newContent,
      yearOfBirth: yearOfBirth,
      isSingle: Math.random() > 0.5,
    }

    setNote([...notes, addedNote])
    setNewNote('')
    setNewContent('')
    setNumber('')

    console.table(addedNote)
  }
   
  const handleSearch = (e)=>{ setFilter(e.target.value); console.log(e.target.value)}
  const search = notes.filter(note => note.name.toLowerCase().includes(filter.toLowerCase()))

  //console.log('Name: ', newNote , "\n", 'Year: ', yearOfBirth)

  return (
    <div>

      <div>
        <input value={filter} onChange={handleSearch} placeholder="Search name"/>
      </div>

      <h1>PhoneBook</h1>
        <form onSubmit={AddName}>
          <input value={newNote} onChange={(e) => setNewNote(e.target.value)}  placeholder='Add Name'/> &nbsp;
          <input value={yearOfBirth} onChange={(e) => setNumber(e.target.value)} placeholder='Add year Of Birth'/> <pre />
          <button type='submit'>Add</button>
        </form>
      
      <h2>Names</h2>
        <ul>
          {search.map(n => <li key={n.id}>{n.name} : {n.yearOfBirth}</li>)}
        </ul>
    </div>
  )
}

export default App
