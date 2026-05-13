import '/src/index.css'

const Form = ({ onSubmit, noteValue, yearValue, noteHandler, yearHandler }) => (
  <form onSubmit={onSubmit}>
    <label htmlFor='name'>Name</label>
    <input
      id='name'
      className='val1'
      value={noteValue}
      onChange={noteHandler}
      placeholder='Add Name'
    />

    <label htmlFor='number'>Number</label>
    <input
      id='number'
      className='val2'
      value={yearValue}
      onChange={yearHandler}
      placeholder='Add Number'
    />

    <br />

    <button type='submit' id='val4'>Add</button>
  </form>
)

export default Form