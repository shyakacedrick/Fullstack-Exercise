import { useState, useEffect, useRef, useCallback } from 'react'
import personService from '/src/services/persons.js'
import './index.css'
import PersonList from './components/personList'
import Form from './components/form'
import Notification from './components/notification'

const getErrorMessage = (error, fallback) => error.response?.data?.error ?? fallback

const Filter = ({value, onChange}) => (
  <input 
    className='val5'
    value={value} 
    onChange={onChange} 
    aria-label='Search names'
    placeholder="Search name" 
  />)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNewNumber] = useState('')
  const [filter, setFilter] = useState ('')

  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)
  const notificationTimer = useRef(null)

    const showNotification = useCallback((notificationMessage, notificationType = 'success') => {
      if (notificationTimer.current) clearTimeout(notificationTimer.current)

      setMessage(notificationMessage)
      setType(notificationType)

      notificationTimer.current = setTimeout(() => {
        setMessage(null)
        setType(null)
        notificationTimer.current = null
      }, 3000)
    }, [])

    useEffect(() => {
      personService.getAll().then(data => {
        setPersons(data)
      }).catch(() => {
        showNotification('Could not load phonebook data', 'error')
      })
    }, [showNotification])

    useEffect(() => () => {
      if (notificationTimer.current) clearTimeout(notificationTimer.current)
    }, [])

    const AddName = (e) => {
      e.preventDefault()

      const name = newName.trim()
      const phoneNumber = number.trim()

      if (!name || !phoneNumber) {
        showNotification('name or number missing', 'error')
        return
      }

      const duplicate = persons.find(p => p.name.trim().toLowerCase() === name.toLowerCase())

        if (duplicate) {
          const confirmUpdate = window.confirm(
            `${duplicate.name} is already added. Replace the old data?`
          )
        
          if (confirmUpdate) {
            const updatedPerson = {
              ...duplicate,
              name,
              number: phoneNumber
            }
          
            personService
              .update(duplicate.id, updatedPerson)
              .then(returnedPerson => {
                setPersons(persons.map(p =>
                  p.id !== duplicate.id ? p : returnedPerson
                ))

                showNotification(`${returnedPerson.name} updated successfully`)

                setNewName('')
                setNewNumber('')
              })
              .catch((error) => {
                if (error.response?.status === 404) {
                  setPersons(persons.filter(p => p.id !== duplicate.id))
                  showNotification(`${duplicate.name} was already removed from server`, 'error')
                  return
                }

                showNotification(getErrorMessage(error, `Could not update ${duplicate.name}`), 'error')
              })
          }
          return
        }
    
      const addedPerson = {
        name,
        number: phoneNumber
      }

      personService
        .create(addedPerson)
        .then(data => {
          setPersons(persons.concat(data))
          showNotification(`${data.name} added successfully`)
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          showNotification(getErrorMessage(error, 'Could not add person'), 'error')
        })
    }

    const noteHandler = (e) => setNewName(e.target.value)
    const yearHandler = (e) =>  setNewNumber(e.target.value)

    const handleDelete = (id) => {
      const person = persons.find(p => p.id === id)
      if (!person) return

        if (window.confirm(`Delete ${person.name}?`)) {
          personService
            .remove(id)
            .then(() => {
              setPersons(persons.filter(p => p.id !== id))
              showNotification(`${person.name} deleted`)
            })
            .catch((error) => {
              if (error.response?.status === 404) {
                setPersons(persons.filter(p => p.id !== id))
                showNotification(`${person.name} was already removed from server`, 'error')
                return
              }

              showNotification(getErrorMessage(error, `Could not delete ${person.name}`), 'error')
            })
      }
    }

    const handleSearch = (e) => setFilter(e.target.value)
    const filteredPersons = persons.filter(note => note.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className='parent'>

      <Notification message={message} type={type} />

      <h1 id='title'>PhoneBook</h1>

      <div className='form'>
        <Form
          onSubmit={AddName}
          noteValue={newName} yearValue={number}
          noteHandler={noteHandler} yearHandler={yearHandler}
        />
      </div>

      <div className='filter'>
        <Filter value={filter} onChange={handleSearch}/>
      </div>

      <div className='names'>
        <h2>Contacts</h2>
        <PersonList persons={filteredPersons} onDelete={handleDelete}/>
      </div>
    </div>
  )
}

export default App