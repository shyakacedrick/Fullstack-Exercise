import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

import App from '../App'
import * as anecdoteService from '../services/anecdotes'

vi.mock('../services/anecdotes')

const anecdotes = [
  {
    id: '1',
    content: 'First anecdote',
    votes: 2,
  },
  {
    id: '2',
    content: 'Second anecdote',
    votes: 5,
  },
]

describe('Store initialization', () => {
  beforeEach(() => {
    anecdoteService.getAll.mockResolvedValue(anecdotes)
  })

  test('loads anecdotes from backend', async () => {
    render(<App />)

    await waitFor(() => {
      expect(
        screen.getByText('First anecdote')
      ).toBeInTheDocument()

      expect(
        screen.getByText('Second anecdote')
      ).toBeInTheDocument()
    })
  })
})