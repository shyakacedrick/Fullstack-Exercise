import {
  useState,
  useImperativeHandle,
  forwardRef,
} from "react"

const Togglable = forwardRef(
  ({ buttonLabel, children }, refs) => {

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

    useImperativeHandle(refs, () => {
      return {
        toggleVisibility,
      }
    })

    return (
      <div>

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
          >
            Cancel
          </button>
        </div>

      </div>
    )

  }
)

export default Togglable