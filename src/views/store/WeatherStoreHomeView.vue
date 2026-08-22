<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseDashboard from '@/components/exercise/BaseDashboard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherStoreCard from '@/components/exercise/store/WeatherStoreCard.vue'
import { getWeatherUx } from '@/utils/getWeatherUx'
import { useWeatherStore } from '@/stores/weatherStore'

const router = useRouter()
const route = useRoute()
const weatherStore = useWeatherStore()
const weatherList = computed(() => weatherStore.weatherList)
const searchQuery = ref('')
const selectedCity = ref(null)
const selectedWeatherUx = computed(() =>
  selectedCity.value ? getWeatherUx(selectedCity.value.weather) : null,
)
onMounted(async () => {
  if (route.query.search) searchQuery.value = route.query.search
  await weatherStore.loadAllWeather()
})
watch(searchQuery, (query) => router.replace({ path: route.path, query: { search: query || undefined } }))
const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return weatherList.value

  const matches = weatherList.value.filter((item) =>
    [item.name, item.engName, item.detailName]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query)),
  )

  // 아직 추가하지 않은 해외 도시를 검색할 때 기존 카드가 모두 사라지지 않게 한다.
  return matches.length ? matches : weatherList.value
})

async function addCityAndOpen(location) {
  const city = await weatherStore.addGlobalCity(location)
  if (city) router.push(`/weather/${encodeURIComponent(city.id)}`)
}

function removeCity(city) {
  weatherStore.removeCity(city)
  if (selectedCity.value?.id === city.id) selectedCity.value = null
}
</script>

<template>
  <div class="dashboard-wrapper weather-dashboard" :class="selectedWeatherUx?.key">
    <div class="data-toolbar">
      <span>관리 도시 {{ weatherList.length }}개 · 데이터: {{ weatherStore.dataSource === 'OPENWEATHER' ? 'OpenWeather 실시간' : '연결 대기' }}</span>
      <div class="toolbar-actions">
        <button v-if="weatherStore.removedDefaultCities.length" :disabled="weatherStore.isLoading" @click="weatherStore.restoreDefaultCities">기본 도시 복구</button>
        <button :disabled="weatherStore.isLoading" @click="weatherStore.loadAllWeather({ force: true })">
          {{ weatherStore.isLoading ? '불러오는 중...' : '새로고침' }}
        </button>
      </div>
    </div>
    <p v-if="weatherStore.errorMessage" class="api-error">{{ weatherStore.errorMessage }}</p>
    <BaseDashboard>
      <SearchBar
        :current-query="searchQuery"
        @update-query="searchQuery = $event"
        @search="weatherStore.searchGlobalCities(searchQuery)"
      />
      <p v-if="weatherStore.isSearching" class="search-message">도시를 검색하는 중입니다...</p>
      <p v-else-if="weatherStore.searchErrorMessage" class="search-message error">
        {{ weatherStore.searchErrorMessage }}
      </p>
      <ul v-if="weatherStore.searchResults.length" class="global-results">
        <li v-for="location in weatherStore.searchResults" :key="`${location.lat}-${location.lon}`">
          <span>
            <strong>{{ location.local_names?.ko || location.name }}</strong>
            <small>{{ location.local_names?.en || location.name }} · {{ location.state || location.country }}</small>
          </span>
          <button @click="addCityAndOpen(location)">추가하고 보기</button>
        </li>
      </ul>
    </BaseDashboard>
    <BaseDashboard>
      <h3>🏙️ 지역별 날씨 현황</h3>
      <p v-if="weatherStore.isLoading">OpenWeather에서 도시 날씨를 불러오는 중입니다...</p>
      <p v-else-if="!filteredWeatherList.length">표시할 도시 데이터가 없습니다.</p>
      <div class="weather-grid">
        <WeatherStoreCard v-for="item in filteredWeatherList" :key="item.id" :city-item="item" :is-selected="selectedCity?.id === item.id" @select-card="selectedCity = $event" @click-detail="router.push(`/weather/${$event}`)" @remove-city="removeCity" />
      </div>
    </BaseDashboard>
    <div v-if="selectedCity" class="weather-feedback">
      <span class="weather-feedback-icon">{{ selectedWeatherUx.icon }}</span>
      <div><strong>{{ selectedCity.name }} · {{ selectedCity.weather }}</strong><p>{{ selectedWeatherUx.message }}</p></div>
    </div>
    <div v-else class="weather-feedback empty">
      카드는 클릭하면 날씨별 UX가 바뀌고, 상세보기 버튼을 누르면 도시 상세 화면으로 이동합니다.
    </div>
  </div>
</template>

<style scoped>
.weather-dashboard { padding: 12px; border-radius: 12px; transition: background .3s ease; }
.weather-dashboard.sunny { background: linear-gradient(135deg, #fff7d6, #fff); }
.weather-dashboard.cloudy { background: linear-gradient(135deg, #e8eef5, #fff); }
.weather-dashboard.rainy { background: linear-gradient(135deg, #dcecff, #f7fbff); }
.weather-dashboard.snowy { background: linear-gradient(135deg, #e8f8ff, #fff); }
.weather-feedback { display: flex; align-items: center; gap: 12px; padding: 14px; color: #334155; background: rgba(255,255,255,.86); border: 1px solid #dbe4ee; border-radius: 8px; }
.weather-feedback-icon { font-size: 30px; }.weather-feedback p { margin: 2px 0 0; }.weather-feedback.empty { justify-content: center; color: #64748b; }
.data-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 8px 10px; margin-bottom: 10px; color: #64748b; font-size: 12px; background: rgba(255,255,255,.75); border-radius: 7px; }.data-toolbar button { padding: 5px 9px; cursor: pointer; border: 1px solid #cbd5e1; border-radius: 5px; }.data-toolbar button:disabled { cursor: wait; opacity: .6; }.api-error { padding: 8px 10px; margin-bottom: 10px; color: #b45309; font-size: 13px; background: #fffbeb; border-radius: 6px; }
.toolbar-actions { display: flex; gap: 6px; }
.weather-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }@media (max-width: 680px) { .weather-grid { grid-template-columns: 1fr; } }
.search-message { margin-top: 8px; color: #64748b; font-size: 13px; }.search-message.error { color: #b45309; }.global-results { padding: 0; margin: 10px 0 0; list-style: none; }.global-results li { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 9px 10px; background: #fff; border-top: 1px solid #e5e7eb; }.global-results span { display: grid; }.global-results small { color: #64748b; }.global-results button { padding: 5px 10px; color: #fff; cursor: pointer; background: #3498db; border: none; border-radius: 5px; }
</style>
