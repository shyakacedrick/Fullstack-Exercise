import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Weather from './components/Weather'

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
    <div className='container'>

    <div className='searchBar'>
      <div className='title    '>
        <h1><i>Get information of any counry of your liking</i></h1>
      </div>
      <div className='search-holder'>
        <input 
          className='searchInput'
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder='Find Countries'
        />

        {matches.length > 10 && (
          <p id='filterPara'>Too many matches, specify another filter</p>
        )}
      </div>

      <div className='suggestionContainer'>
        {matches.length <= 10 && matches.length > 1 && (
        matches.map(c => (
          <div key={c.cca3} className='suggestionDisplay'>
            <p className='sug-para'>{c.name.common}</p>
            <button onClick={() => setQuery(c.name.common)} className='btn'>
              show
            </button>
          </div>
          ))
        )}
      </div>
    </div>

      {matches.length === 1 && (
        <div className='card'>

          <div className='flag'>
            <img 
              src={matches[0].flags.png} 
              // width="150" 
              alt="flag"
            />
          </div>

          <div className="country-details">
            <div className='Details'>
              <h1>{matches[0].name.common}</h1>
              <p>capital {matches[0].capital[0]}</p>
              <p>area {matches[0].area}</p>

              <b>languages:</b>
              <ul>
                {Object.values(matches[0].languages).map(l => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          
            <div className="weather">
              <Weather city={matches[0].capital[0]} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App