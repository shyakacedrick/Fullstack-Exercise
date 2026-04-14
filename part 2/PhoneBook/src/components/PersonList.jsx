import '/src/index.css'

const PersonList = ({persons, onDelete}) => (
  
     <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Quote</th>
          </tr>
        </thead>

        <tbody>
          {persons.map(n => <SinglePerson key={n.id} person={n} onDelete={onDelete}/>)}
        </tbody>
     </table>

)

const SinglePerson = ({person, onDelete}) => (

    <tr className='person'>
      <td>{person.name}</td>
      <td>{person.yearOfBirth}</td>
      <td><i>"{person.quote}"</i></td>
      <td><button onClick={() => onDelete(person.id)}>Delete</button></td>
    </tr>

)

export default PersonList