import axios from 'axios'
 
const api_key = import.meta.env.VITE_WEATHER_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (city) => {
  return axios
    .get(`${baseUrl}?q=${city}&units=metric&appid=${api_key}`)
    .then(res => res.data)
}

export default { getWeather }