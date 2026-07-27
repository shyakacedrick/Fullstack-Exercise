const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseUrl)
  return await response.json()
}

export const createAnecdote = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
  }

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAnecdote),
  })

  return await response.json()
}