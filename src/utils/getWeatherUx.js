export function getWeatherUx(weather) {
  const normalizedWeather = weather?.toLowerCase() ?? ''

  if (
    normalizedWeather.includes('비') ||
    normalizedWeather.includes('rain') ||
    normalizedWeather.includes('drizzle') ||
    normalizedWeather.includes('thunderstorm')
  ) {
    return { key: 'rainy', icon: '🌧️', message: '우산을 챙기고 빗길 이동에 주의하세요.' }
  }

  if (
    normalizedWeather.includes('흐림') ||
    normalizedWeather.includes('구름') ||
    normalizedWeather.includes('cloud') ||
    normalizedWeather.includes('overcast')
  ) {
    return { key: 'cloudy', icon: '☁️', message: '구름이 많은 날이에요. 가벼운 외출을 계획해 보세요.' }
  }

  if (normalizedWeather.includes('눈') || normalizedWeather.includes('snow')) {
    return { key: 'snowy', icon: '❄️', message: '따뜻하게 입고 미끄러운 길을 조심하세요.' }
  }

  return { key: 'sunny', icon: '☀️', message: '맑은 날이에요. 야외 활동하기 좋습니다.' }
}
