<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

import BaseDashboardCard from './BaseDashboard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

const weatherList = ref([
    {id: 'city_01', name: '서울', engName: 'seoul', weather: '맑음', temp: 25, stockTheme: '💻 IT·소프트웨어, 금융 (플랫폼, 핀테크 관련주)'},
    {id: 'city_02', name: '부산', engName: 'busan', weather: '흐림', temp: 22,stockTheme: '🚢 해운·물류, 해양 레저 (조선, 관광, 항만 관련주)'},
    {id: 'city_03', name: '대구', engName: 'daegu', weather: '비', temp: 32,stockTheme: '⚙️ 기계·로봇, 자동차 부품 (지능형 로봇, 부품 관련주)'},
    {id: 'city_04', name: '인천', engName: 'incheon', weather: '맑음', temp: 24,stockTheme: '🧬 바이오, 항공·물류 (바이오시밀러, 항공사 관련주)'},
    {id: 'city_05', name: '광주', engName: 'gwangju', weather: '흐림', temp: 30,stockTheme: '🚗 완성차 모빌리티, 인공지능 (완성차, AI 테마주)'},
    {id: 'city_06', name: '대전', engName: 'daejeon', weather: '비', temp: 19,stockTheme: '🚀 우주항공, 국방·방산 (R&D, 방위산업 관련주)'},
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요')

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return weatherList.value
  }

  return weatherList.value.filter((item) => {
    return item.name.includes(query) || item.engName.includes(query)
  })
})

const marketSentiment = computed(() => {
  if (filteredWeatherList.value.length === 0 || !searchQuery.value.trim()) {
    return '⚖️ 관망세 (포트폴리오 유지)'
  }

  const hasBadWeather = filteredWeatherList.value.some(
    (item) => item.weather === '비' || item.temp < 20,
  )

  if (hasBadWeather) {
    return '📉 Risk-Off: 보수적 접근 (유동성 축소/긴축 대비 방어주 편입 권장)'
  }

  return '📈 Risk-On: 공격적 투자 (풍부한 유동성 장세/성장주 비중 확대)'
})

const showDetail = (cityName, weather) => {
  window.alert(`${cityName}의 현재 날씨는 [${weather}] 상태입니다.`)
}

watch(selectedCityInfo, (newInfo) => {
  console.log(`👁️‍🗨️ [watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${newInfo}"`)
})

watchEffect(() => {
  console.log(
    `🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`,
  )
})

watch(marketSentiment, (newSentiment, oldSentiment) => {
  console.log('=========================================')
  console.log('🚨 [매크로 환경 변화 감지]')
  console.log(`이전 시장: ${oldSentiment}`)
  console.log(`현재 시장: ${newSentiment}`)
  console.log('🔔 트레이딩 알고리즘: 포트폴리오 리밸런싱을 시작합니다...')
  console.log('=========================================')
})
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="searchQuery = $event" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🏙️ 지역별 날씨 현황</h3>

      <WeatherCard
        v-for="item in filteredWeatherList"
        :key="item.id"
        :city-item="item"
        @select-card="selectedCityInfo = $event"
        @click-detail="showDetail"
      />

      <p v-if="filteredWeatherList.length === 0" class="empty-message">
        😭 검색 결과와 일치하는 도시가 없습니다.
      </p>
    </BaseDashboardCard>

    <div class="market-sentiment">
      <strong>현재 주식 시장 심리 지수:</strong>
      {{ marketSentiment }}
    </div>

    <div class="weather-feedback-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: min(100%, 600px);
  margin: 0 auto;
}

.empty-message {
  padding: 10px 0;
  color: #e74c3c;
  text-align: center;
}

.market-sentiment {
  margin: 20px 0 12px;
  padding: 15px;
  color: #2c3e50;
  background-color: #f1f2f6;
  border-radius: 8px;
}
</style>
