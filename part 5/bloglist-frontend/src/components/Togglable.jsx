import { useState } from "react"

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible ? "none" : ""
  }

  const showWhenVisible = {
    display: visible ? "" : "none"
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="togglable">
      <div style={hideWhenVisible}>
        <button
          className="btn btn-primary"
          onClick={toggleVisibility}
        >
          {buttonLabel}
        </button>
      </div>

      <div style={showWhenVisible}>
        {children}

        <button
          className="btn btn-secondary"
          onClick={toggleVisibility}
          style={{ marginTop: "1rem" }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Togglable