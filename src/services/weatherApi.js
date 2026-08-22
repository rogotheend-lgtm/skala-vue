import axios from 'axios'

const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
})

export async function getCurrentWeather(cityName) {
  const response = await weatherApi.get('/weather', {
    params: {
      q: `${cityName},KR`,
      appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
      units: 'metric',
      lang: 'en',
    },
  })

  return response.data
}

export async function getCurrentWeatherByCoordinates(lat, lon) {
  const response = await weatherApi.get('/weather', {
    params: {
      lat,
      lon,
      appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
      units: 'metric',
      lang: 'en',
    },
  })

  return response.data
}

export async function searchLocations(query) {
  const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
    params: {
      q: query,
      limit: 5,
      appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    },
  })

  return response.data
}
