<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weatherStore'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()
const cityData = computed(
  () => weatherStore.getCityById(route.params.cityId),
)
const displayTemp = computed(() => {
  if (!cityData.value) return ''
  return configStore.unit === 'fahrenheit' ? Math.round((cityData.value.temp * 9) / 5 + 32) : cityData.value.temp
})

weatherStore.loadAllWeather()
</script>

<template>
  <div class="detail-container">
    <h3>📊 지역별 상세 기상 관측 정보</h3><hr />
    <div v-if="cityData" class="info-card">
      <h4>📍 지정 지역: {{ cityData.detailName }}</h4>
      <p>실시간 기온: <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong></p>
      <p v-if="cityData.feelsLike !== undefined">체감 기온: {{ cityData.feelsLike }}℃</p>
      <p>기상 현황: {{ cityData.weather }}</p><p>대기 습도: {{ cityData.humidity }}</p><p>현재 풍속: {{ cityData.wind }}</p>
      <p>추천 섹터: {{ cityData.stockTheme }}</p>
    </div>
    <p v-else>해당 지역의 상세 데이터가 존재하지 않습니다.</p>
    <button class="back-btn" @click="router.push('/weather')">← 날씨 대시보드로 돌아가기</button>
  </div>
</template>

<style scoped>
.detail-container { padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
.info-card { padding: 15px; margin: 15px 0; background: #f1f2f6; border-radius: 6px; }
.back-btn { padding: 8px 12px; color: white; cursor: pointer; background: #2c3e50; border: none; border-radius: 4px; }
</style>
