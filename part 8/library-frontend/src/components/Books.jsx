import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { useState } from 'react'

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
      # ===== EXERCISE 20: Fetch genres so React can filter the book list =====
      genres
    }
  }
`

const Books = (props) => {
  // ===== EXERCISE 20: Keep the selected genre in component state =====
  const [selectedGenre, setSelectedGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  // ===== EXERCISE 20: Derive the filter buttons and visible books in React =====
  const genres = [...new Set(books.flatMap((book) => book.genres))]
  const booksToShow = selectedGenre
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : books

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

          {booksToShow.map((book) => (
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
