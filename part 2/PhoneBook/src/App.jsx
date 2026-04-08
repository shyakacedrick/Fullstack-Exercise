import React, {useState} from 'react'

const App = () => {
  const [notes, setNote] = useState([
    {id: 1, topic: 'Math', content: 'content A', number: 1234, isComplicated: true},
    {id: 2, topic: 'Chemistry', content: 'content B', number: 4567, isComplicated: false},
    {id: 3, topic: 'Computer Science', content: 'content C', number: 7890, isComplicated: false},
    {id: 4, topic: 'English', content: 'content D', number: 9876, isComplicated: true},
  ])
  
  const [newNote, setNewNote] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState ('')

  const Add = (e) => {
    e.preventDefault()
    
    const duplicate = notes.find(n => n.content.toLowerCase() === newNote.toLowerCase())
    if (duplicate) { alert( `${newNote} already exist in the PhoneBook`); return }

    const Added = {
      id: String(Date.now()),
      content: newNote,
      number: number,
      isComplicated: Math.random() > 0.5,
    }

    setNote(notes.concat(Added))
    setNewNote('')
    setNumber('')
    console.table(Added)
  }
   
 const handleSearch = (e)=>{
    setSearch(e.target.value)
    console.log(e.target.value)
 }


  const filteredNotes = notes.filter(note => note.content.toLowerCase().includes(search.toLowerCase()))

  // console.log('Content: ', newNote , "\n", 'Number: ', number)

  return (
    <div>
      <h1>PhoneBook</h1>
      <div>
        Search: <input value={search} onChange={handleSearch}/>
      </div>
        <form onSubmit={Add}>

          <input value={newNote} onChange={(e) => setNewNote(e.target.value)}  placeholder='Add content 5...'/>

          <input value={number} onChange={(e) => setNumber(e.target.value)} placeholder='Add number...'/> <br />

          <button type='submit'>Add</button>
        </form>
        <br />
      
      <h1>Notes</h1>
        <ul>
          {filteredNotes.map(n => <li key={n.id}>{n.content} : {n.number}</li>)}
        </ul>
    </div>
  )
}

export default App
