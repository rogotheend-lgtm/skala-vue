<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseDashboard from '../components/exercise/BaseDashboard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import { weatherMockData } from '@/data/weatherMockData'
import { getWeatherUx } from '@/utils/getWeatherUx'

const router = useRouter()
const route = useRoute()
const weatherList = ref([...weatherMockData])
const searchQuery = ref('')
const selectedCity = ref(null)
const selectedWeatherUx = computed(() =>
  selectedCity.value ? getWeatherUx(selectedCity.value.weather) : null,
)

onMounted(() => {
  if (route.query.search) searchQuery.value = route.query.search
})
watch(searchQuery, (newQuery) => {
  router.replace({ path: route.path, query: { search: newQuery || undefined } })
})
const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return query
    ? weatherList.value.filter((item) => item.name.includes(query) || item.engName.includes(query))
    : weatherList.value
})
const handleDetailJump = (id) => router.push(`/weather/${id}`)
</script>

<template>
  <div class="dashboard-wrapper weather-dashboard" :class="selectedWeatherUx?.key">
    <BaseDashboard>
      <SearchBar :current-query="searchQuery" @update-query="searchQuery = $event" />
    </BaseDashboard>
    <BaseDashboard>
      <h3>🏙️ 지역별 날씨 현황</h3>
      <WeatherCard
        v-for="item in filteredWeatherList"
        :key="item.id"
        :city-item="item"
        :is-selected="selectedCity?.id === item.id"
        @select-card="selectedCity = $event"
        @click-detail="handleDetailJump"
      />
    </BaseDashboard>
    <div v-if="selectedCity" class="weather-feedback">
      <span class="weather-feedback-icon">{{ selectedWeatherUx.icon }}</span>
      <div>
        <strong>{{ selectedCity.name }} · {{ selectedCity.weather }}</strong>
        <p>{{ selectedWeatherUx.message }}</p>
      </div>
    </div>
    <div v-else class="weather-feedback empty">카드를 클릭하거나 검색해 보세요.</div>
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
</style>
