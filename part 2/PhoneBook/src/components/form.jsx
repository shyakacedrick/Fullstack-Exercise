import '/src/index.css'

const Form = (
    {
    onSubmit, 
    noteValue, 
    yearValue, 
    quoteValue, 
    noteHandler, 
    quoteHandler, 
    yearHandler}

    ) => (
    
    <form onSubmit={onSubmit}>
      <input 
        className='val1'
        value={noteValue} 
        onChange={noteHandler }  
        placeholder='Add Name'
      /> 

      <input 
        className='val2'
        value={yearValue} 
        onChange={yearHandler}  
        placeholder='Add year Of Birth'
      />

      <input 
        className='val3'
        value={quoteValue} 
        onChange={quoteHandler}  
        placeholder='Add your quote..'
      /> 

      <br />

      <button type='submit' id='val4'>Add</button>
    </form>
)

export default Form