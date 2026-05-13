import '/src/index.css'

const PersonList = ({persons, onDelete}) => (
  
     <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {persons.map(n => <SinglePerson key={n.id} person={n} onDelete={onDelete}/>)}
        </tbody>
     </table>

)

const SinglePerson = ({person, onDelete}) => (

    <tr className='person'>
      <td>{person.id}</td>
      <td>{person.name}</td>
      <td><i>"{person.number}"</i></td>
      <td><button type='button' onClick={() => onDelete(person.id)}>Delete</button></td>
    </tr>

)

export default PersonList