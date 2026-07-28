import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'

import AnecdoteList from '../components/AnecdoteList'
import { useAnecdotes } from '../store'

describe('AnecdoteList', () => {
  test('renders anecdotes sorted by votes', () => {
    useAnecdotes.setState({
      anecdotes: [
        {
          id: '1',
          content: 'Low',
          votes: 1,
        },
        {
          id: '2',
          content: 'High',
          votes: 10,
        },
      ],
      filter: '',
    })

    render(<AnecdoteList />)

    const anecdotes =
      screen.getAllByText(/Low|High/)

    expect(anecdotes[0]).toHaveTextContent('High')
    expect(anecdotes[1]).toHaveTextContent('Low')
  })
})