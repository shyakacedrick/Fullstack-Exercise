const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div className="login-form__group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          placeholder="Enter your username"
          autoComplete="username"
        />
      </div>

      <div className="login-form__group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
        />
      </div>

      <button type="submit">Log in</button>
    </form>
  )
}

export default LoginForm