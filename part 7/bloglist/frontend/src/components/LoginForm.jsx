import {
  TextField,
  Button,
  Box,
  Paper,
  Typography
} from '@mui/material'

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <form className="form" onSubmit={handleLogin} aria-label="Login form">
      <div className="form-group">
        <label className="label" htmlFor="username">Username</label>
        <input id="username" className="input" type="text" value={username} onChange={({ target }) => setUsername(target.value)} 
        placeholder="Enter your username" autoComplete="username" />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="password">Password</label>
        <input id="password" className="input" type="password" value={password} onChange={({ target }) => setPassword(target.value)} 
        placeholder="Enter your password" autoComplete="current-password" />
      </div>

      <button className="btn btn-primary" type="submit">Login</button>
    </form>
  )
}

export default LoginForm