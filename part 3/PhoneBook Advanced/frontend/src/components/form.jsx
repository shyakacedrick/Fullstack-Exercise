import '/src/index.css'

const Form = ({ onSubmit, noteValue, yearValue, noteHandler, yearHandler }) => (
  <form onSubmit={onSubmit}>
    <div className='form-field'>
      <label htmlFor='name'>Name</label>
      <input
        id='name'
        className='val1'
        value={noteValue}
        onChange={noteHandler}
        placeholder='Enter full name'
      />
    </div>

    <div className='form-field'>
      <label htmlFor='number'>Number</label>
      <input
        id='number'
        className='val2'
        value={yearValue}
        onChange={yearHandler}
        placeholder='Enter phone number'
      />
    </div>

    <div className='form-submit'>
      <button type='submit' id='val4'>Add Contact</button>
    </div>
  </form>
)

export default Form