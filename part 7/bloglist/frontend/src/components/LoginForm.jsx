const LoginForm = ({ username, password, handleLogin }) => {
  return (
    <form className="form" onSubmit={handleLogin}>
      <div className="form-group">
        <label className="label">Username</label>

        <input
          className="input"
          {...username.input}
          placeholder="Enter username"
        />
      </div>

      <div className="form-group">
        <label className="label">Password</label>

        <input
          className="input"
          {...password.input}
          placeholder="Enter password"
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm
