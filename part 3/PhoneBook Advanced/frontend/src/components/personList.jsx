import '/src/index.css'

const PersonList = ({persons, onDelete}) => (

     <table className='phonebook-table'>
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
      <td className='cell-id'>{person.id.slice(-6)}</td>
      <td className='cell-name'>{person.name}</td>
      <td className='cell-number'>{person.number}</td>
      <td className='cell-actions'>
        <button type='button' className='btn-delete' onClick={() => onDelete(person.id)}>Delete</button>
      </td>
    </tr>

)

export default PersonList