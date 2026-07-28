import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'

import AnecdoteList from '../components/AnecdoteList'
import { useAnecdotes } from '../store'

describe('Filtering', () => {
  test('shows only matching anecdotes', () => {
    useAnecdotes.setState({
      anecdotes: [
        {
          id: '1',
          content: 'React',
          votes: 1,
        },
        {
          id: '2',
          content: 'Java',
          votes: 3,
        },
      ],
      filter: 'rea',
    })

    render(<AnecdoteList />)

    expect(
      screen.getByText('React')
    ).toBeInTheDocument()

    expect(
      screen.queryByText('Java')
    ).not.toBeInTheDocument()
  })
})