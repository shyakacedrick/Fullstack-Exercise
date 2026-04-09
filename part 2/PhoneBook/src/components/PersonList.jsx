import '/src/index.css'

const PersonList = ({persons}) => (
  
     <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Quote</th>
          </tr>
        </thead>

        <tbody>
          {persons.map(n => <SinglePerson key={n.id} person={n}/>)}
        </tbody>
     </table>

)

const SinglePerson = ({person}) => (

    <tr className='person'>
      <td>{person.name}</td>
      <td>{person.yearOfBirth}</td>
      <td><i>"{person.quote}"</i></td>
    </tr>

)

export default PersonList