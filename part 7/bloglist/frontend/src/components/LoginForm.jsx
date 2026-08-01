const LoginForm = ({
  username,
  password,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label>Username</label>

        <input
          {...username.input}
          placeholder="Enter username"
        />
      </div>

      <div className="form-group">
        <label>Password</label>

        <input
          {...password.input}
          placeholder="Enter password"
        />
      </div>

      <button
        className="btn btn-primary"
        type="submit"
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm