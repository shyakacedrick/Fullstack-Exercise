import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'

import AnecdoteList from '../components/AnecdoteList'
import { useAnecdotes } from '../store'

import * as service from '../services/anecdotes'

vi.mock('../services/anecdotes')

describe('Voting', () => {
  test('clicking vote increases votes', async () => {
    const anecdote = {
      id: '1',
      content: 'React',
      votes: 0,
    }

    useAnecdotes.setState({
      anecdotes: [anecdote],
      filter: '',
    })

    service.updateAnecdote.mockResolvedValue({
      ...anecdote,
      votes: 1,
    })

    render(<AnecdoteList />)

    fireEvent.click(
      screen.getByText('vote')
    )

    expect(
      service.updateAnecdote
    ).toHaveBeenCalled()
  })
})