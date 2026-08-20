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
    return <div className="loading-state">Finding your next read…</div>
  }

  const books = result.data.allBooks
  const genres = [
    ...new Set(genresResult.data.allBooks.flatMap((book) => book.genres)),
  ]

  return (
    <section className="view-panel books-view">
      <div className="view-heading"><span className="eyebrow">Curated catalogue</span><h2>books</h2><p>A living collection for curious readers.</p></div>

      {selectedGenre && <p className="filter-summary">Showing titles in <strong>{selectedGenre}</strong></p>}

      <div className="table-shell"><table>
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
      </table></div>

      <div className="genre-filters" aria-label="Filter books by genre">
        {/* ===== EXERCISE 20: Genre filter controls for the book list ===== */}
        {genres.map((genre) => (
          <button className={`genre-chip ${selectedGenre === genre ? 'is-selected' : ''}`} key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button className={`genre-chip ${!selectedGenre ? 'is-selected' : ''}`} onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </section>
  )
}

export default Books
