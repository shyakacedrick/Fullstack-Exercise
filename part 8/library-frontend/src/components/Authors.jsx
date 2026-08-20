import { gql } from '@apollo/client'
import { useQuery, useMutation } from '@apollo/client/react'
import { useState } from 'react'

const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`
const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: ['allAuthors'],
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div className="loading-state">Loading the writers’ room…</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    await editAuthor({
      variables: {
        name,
        setBornTo: Number(born),
      },
    })

    setName('')
    setBorn('')
  }

  return (
    <section className="view-panel authors-view">
      <div className="view-heading"><span className="eyebrow">The people behind the pages</span><h2>authors</h2><p>Explore the minds that shape this collection.</p></div>

      <div className="table-shell"><table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>

          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table></div>

      {/* ===== EXERCISE 19: Only logged-in users may edit author birth years ===== */}
      {props.token && (
        <>
          {/* ===== EXERCISE 24: Match the required author-edit form labels ===== */}
          <div className="form-card compact-form"><span className="eyebrow">Editorial detail</span><h3>Set birthyear</h3>

          <form onSubmit={submit}>
            <div>
              <label>
                name
                <select
                  name="name"
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                >
                  <option value="">select author</option>

                  {authors.map((author) => (
                    <option key={author.id} value={author.name}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label>
                born
                <input
                  type="number"
                  value={born}
                  onChange={({ target }) => setBorn(target.value)}
                />
              </label>
            </div>

            <button className="button button--primary" type="submit">update author</button>
          </form>
          </div>
        </>
      )}
    </section>
  )
}

export default Authors
