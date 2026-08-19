import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

// ===== EXERCISE 18: Fix the list of books query after the backend change =====
const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      id
      title
      # author is an Author object, so the book list must request its name
      author {
        name
      }
      published
    }
  }
`

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>

          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              {/* Display the author name used by the fixed book list query */}
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
