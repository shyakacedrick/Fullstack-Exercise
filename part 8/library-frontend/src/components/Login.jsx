import { useState } from 'react'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

// ===== EXERCISE 19: Request a token after the user logs in =====
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // ===== EXERCISE 24: Give feedback when an automated login attempt fails =====
  const [error, setError] = useState(null)
  const [login] = useMutation(LOGIN)

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    setError(null)

    try {
      const result = await login({
        variables: { username, password },
      })

      const token = result.data.login.value
      localStorage.setItem('library-user-token', token)
      setToken(token)
      setPage('authors')
    } catch (error) {
      setError('login failed')
    }
  }

  return (
    <div>
      <h2>login</h2>

      {error && <div>{error}</div>}

      <form onSubmit={submit}>
        <div>
          <label>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
