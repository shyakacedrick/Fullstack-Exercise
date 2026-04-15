import { useState, useEffect } from 'react'
import countryService from './services/countries'

const App = () => {
  const [query, setQuery] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    countryService.getAll().then(data => setAllCountries(data))
  }, [])

  const matches = allCountries.filter(c => 
    c.name.common.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      find countries <input value={query} onChange={(e) => setQuery(e.target.value)} />
      
      {matches.length > 10 && <p>Too many matches, specify another filter</p>}
      
      {matches.length <= 10 && matches.length > 1 && (
        matches.map(c => <div key={c.cca3}>{c.name.common}</div>)
      )}

      {matches.length === 1 && (
        <div>
          <h1>{matches[0].name.common}</h1>
          <p>capital {matches[0].capital[0]}</p>
          <p>area {matches[0].area}</p>
          <b>languages:</b>
          <ul>
            {Object.values(matches[0].languages).map(l => <li key={l}>{l}</li>)}
          </ul>
          <img src={matches[0].flags.png} width="150" />
        </div>
      )}
    </div>
  )
}

export default App