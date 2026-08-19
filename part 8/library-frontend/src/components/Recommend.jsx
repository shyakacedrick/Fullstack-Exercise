import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

// ===== EXERCISE 21: Read the favourite genre of the authenticated user =====
const ME = gql`
  query me {
    me {
      favoriteGenre
    }
  }
`

const BOOKS_BY_GENRE = gql`
  query allBooksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      id
      title
      author {
        name
      }
      published
    }
  }
`

const Recommend = ({ show }) => {
  const meResult = useQuery(ME, { skip: !show })
  const favoriteGenre = meResult.data?.me?.favoriteGenre

  // ===== EXERCISE 21: Request only books in the user's favourite genre =====
  const booksResult = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre },
    skip: !show || !favoriteGenre,
  })

  if (!show) {
    return null
  }

  if (meResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  if (!favoriteGenre) {
    return <div>could not find your favourite genre</div>
  }

  const books = booksResult.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>

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
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
