import React, {useState} from 'react'

const App = () => {
  const [notes, setNote] = useState([
    {id: 1, topic: 'Math', content: 'content 1', isComplicated: true},
    {id: 2, topic: 'Chemistry', content: 'content 2', isComplicated: false},
    {id: 3, topic: 'Computer Science', content: 'content 3', isComplicated: false},
    {id: 4, topic: 'English', content: 'content 4', isComplicated: true},
  ])

  const [newNote, setNewNote] = useState('')
  const handler = (e) => {
    setNewNote(e.target.value) 
    console.log(e.target.value)
  }
  const Add = (e) => {
    e.preventDefault()
    
    const duplicate = notes.find(n => n.content.toLowerCase() === newNote.toLowerCase())
    if (duplicate) { alert( `${newNote} already exist in the PhoneBook`); return }

    const Added = {
      id: String(notes.length + 1),
      content: newNote,
      isComplicated: Math.random() > 0.5,
    }

    setNote(notes.concat(Added))
    setNewNote('')
    console.table(Added)
  }

  return (
    <div>
      <h1>PhoneBook</h1>
        <form onSubmit={Add}>
          <input value={newNote} onChange={handler} placeholder='Add content 5...'/>
          <button>Add</button>
        </form>
        <br />
        <i>Debug: {newNote}</i>
      
      <h1>Notes</h1>
        <ul>
          {notes.map(n => <li key={n.id}>{n.content}</li>)}
        </ul>
    </div>
  )
}

export default App
