import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { cityNames } from '@/data/cityNames'
import {
  getCurrentWeather,
  getCurrentWeatherByCoordinates,
  searchLocations,
} from '@/services/weatherApi'

export const useWeatherStore = defineStore('weather', () => {
  const savedRemovedCities = localStorage.getItem('removedDefaultCities')
  const savedGlobalCities = localStorage.getItem('savedGlobalCities')
  const weatherList = ref([])
  const isLoading = ref(false)
  const errorMessage = ref('')
  const dataSource = ref('WAITING')
  const hasLoaded = ref(false)
  const searchResults = ref([])
  const isSearching = ref(false)
  const searchErrorMessage = ref('')
  const removedDefaultCities = ref(savedRemovedCities ? JSON.parse(savedRemovedCities) : [])
  const globalCities = ref(savedGlobalCities ? JSON.parse(savedGlobalCities) : [])

  const updatedAt = ref(null)

  async function loadAllWeather({ force = false } = {}) {
    if (hasLoaded.value && !force) return

    try {
      isLoading.value = true
      errorMessage.value = ''

      const activeCityNames = cityNames.filter(
        (cityName) => !removedDefaultCities.value.includes(cityName.toLowerCase()),
      )
      const cityRequests = [
        ...activeCityNames.map((cityName) => ({
          type: 'default',
          engName: cityName.toLowerCase(),
          request: getCurrentWeather(cityName),
        })),
        ...globalCities.value.map((city) => ({
          type: 'global',
          ...city,
          request: getCurrentWeatherByCoordinates(city.lat, city.lon),
        })),
      ]
      const responses = await Promise.all(cityRequests.map((city) => city.request))

      weatherList.value = responses.map((apiData, index) => {
        const savedCity = cityRequests[index]
        const isGlobalCity = savedCity.type === 'global'
        return {
          id: isGlobalCity ? `global_${savedCity.lat}_${savedCity.lon}` : String(apiData.id),
          name: savedCity.name || apiData.name,
          detailName: savedCity.detailName || `${apiData.name}, ${apiData.sys.country}`,
          engName: savedCity.engName || apiData.name.toLowerCase(),
          country: apiData.sys.country,
          lat: apiData.coord.lat,
          lon: apiData.coord.lon,
          temp: apiData.main.temp,
          feelsLike: apiData.main.feels_like,
          humidity: `${apiData.main.humidity}%`,
          wind: `${apiData.wind.speed}m/s`,
          weather: apiData.weather[0].description,
          weatherCode: apiData.weather[0].id,
          weatherIcon: apiData.weather[0].icon,
        }
      }).filter(
        (city) =>
          city.id.startsWith('global_') ||
          !removedDefaultCities.value.includes(city.engName.toLowerCase()),
      )

      dataSource.value = 'OPENWEATHER'
      updatedAt.value = new Date()
    } catch (error) {
      weatherList.value = []
      dataSource.value = 'ERROR'
      errorMessage.value = '실시간 날씨를 불러오지 못했습니다. 새로고침을 눌러 다시 시도해 주세요.'
      console.error(error)
    } finally {
      hasLoaded.value = true
      isLoading.value = false
    }
  }

  const getCityById = computed(() => {
    return (cityId) => weatherList.value.find((city) => city.id === cityId) ?? null
  })

  async function searchGlobalCities(query) {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      searchResults.value = []
      return
    }

    try {
      isSearching.value = true
      searchErrorMessage.value = ''
      searchResults.value = await searchLocations(trimmedQuery)

      if (searchResults.value.length === 0) {
        searchErrorMessage.value = '검색 결과가 없습니다.'
      }
    } catch (error) {
      searchResults.value = []
      searchErrorMessage.value = '전 세계 도시 검색에 실패했습니다.'
      console.error(error)
    } finally {
      isSearching.value = false
    }
  }

  async function addGlobalCity(location) {
    const duplicate = weatherList.value.find(
      (city) => city.lat === location.lat && city.lon === location.lon,
    )

    if (duplicate) {
      searchResults.value = []
      return duplicate
    }

    try {
      isSearching.value = true
      searchErrorMessage.value = ''
      const apiData = await getCurrentWeatherByCoordinates(location.lat, location.lon)
      const koreanName = location.local_names?.ko || location.name
      const englishName = location.local_names?.en || location.name
      const city = {
        id: `global_${location.lat}_${location.lon}`,
        name: koreanName,
        detailName: `${koreanName}, ${location.state || location.country}`,
        engName: englishName.toLowerCase(),
        country: location.country,
        lat: location.lat,
        lon: location.lon,
        temp: apiData.main.temp,
        feelsLike: apiData.main.feels_like,
        humidity: `${apiData.main.humidity}%`,
        wind: `${apiData.wind.speed}m/s`,
        weather: apiData.weather[0].description,
        weatherCode: apiData.weather[0].id,
        weatherIcon: apiData.weather[0].icon,
      }

      weatherList.value.push(city)
      globalCities.value.push({
        name: city.name,
        detailName: city.detailName,
        engName: city.engName,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
      })
      localStorage.setItem('savedGlobalCities', JSON.stringify(globalCities.value))
      searchResults.value = []
      return city
    } catch (error) {
      searchErrorMessage.value = '선택한 도시의 날씨를 불러오지 못했습니다.'
      console.error(error)
      return null
    } finally {
      isSearching.value = false
    }
  }

  function removeCity(city) {
    weatherList.value = weatherList.value.filter((item) => item.id !== city.id)

    globalCities.value = globalCities.value.filter(
      (savedCity) => savedCity.lat !== city.lat || savedCity.lon !== city.lon,
    )
    localStorage.setItem('savedGlobalCities', JSON.stringify(globalCities.value))

    const defaultCityName = cityNames.find(
      (cityName) => cityName.toLowerCase() === city.engName?.toLowerCase(),
    )
    if (defaultCityName && !removedDefaultCities.value.includes(defaultCityName.toLowerCase())) {
      removedDefaultCities.value.push(defaultCityName.toLowerCase())
      localStorage.setItem('removedDefaultCities', JSON.stringify(removedDefaultCities.value))
    }
  }

  async function restoreDefaultCities() {
    removedDefaultCities.value = []
    localStorage.removeItem('removedDefaultCities')
    await loadAllWeather({ force: true })
  }

  return {
    weatherList,
    isLoading,
    errorMessage,
    dataSource,
    updatedAt,
    loadAllWeather,
    getCityById,
    searchResults,
    isSearching,
    searchErrorMessage,
    removedDefaultCities,
    searchGlobalCities,
    addGlobalCity,
    removeCity,
    restoreDefaultCities,
  }
})
