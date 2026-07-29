import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addAnecdote }) => {
  const navigate = useNavigate()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const resetFields = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addAnecdote({
      content: content.inputProps.value,
      author: author.inputProps.value,
      info: info.inputProps.value,
      votes: 0,
    })

    resetFields()
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>

      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            {...content.inputProps}
          />
        </div>

        <div>
          author
          <input
            name="author"
            {...author.inputProps} 
          />
        </div>

        <div>
          url for more info
          <input
            name="info"
             {...info.inputProps}
          />
        </div>

        <button>create</button>

        <button type="button" onClick={resetFields}>
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateNew