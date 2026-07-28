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

export const updateAnecdote = async (anecdote) => {
  const response = await fetch(
    `${baseUrl}/${anecdote.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(anecdote),
    }
  )

  return await response.json()
}








export const deleteAnecdote = async (id) => {
  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  })
}