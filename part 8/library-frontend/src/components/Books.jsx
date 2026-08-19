import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { useState } from 'react'

// ===== EXERCISE 22: Ask the server for books matching the selected genre =====
const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      # author is an Author object, so the book list must request its name
      author {
        name
      }
      published
      # ===== EXERCISE 20: Fetch genres so React can filter the book list =====
      genres
    }
  }
`

// ===== EXERCISE 22: Keep all genre buttons visible, even after filtering =====
const ALL_GENRES = gql`
  query allGenres {
    allBooks {
      genres
    }
  }
`

const Books = (props) => {
  // ===== EXERCISE 22: Changing this value triggers a new GraphQL request =====
  const [selectedGenre, setSelectedGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  })
  const genresResult = useQuery(ALL_GENRES)

  if (!props.show) {
    return null
  }

  if (result.loading || genresResult.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = [
    ...new Set(genresResult.data.allBooks.flatMap((book) => book.genres)),
  ]

  return (
    <div>
      <h2>books</h2>

      {selectedGenre && <p>in genre {selectedGenre}</p>}

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

      <div>
        {/* ===== EXERCISE 20: Genre filter controls for the book list ===== */}
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
