<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const props = defineProps({
  cityItem: { type: Object, required: true },
  isSelected: { type: Boolean, default: false },
})
const emit = defineEmits(['select-card', 'click-detail', 'remove-city'])
const configStore = useConfigStore()
const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp
  return configStore.unit === 'fahrenheit' ? Math.round((rawTemp * 9) / 5 + 32) : rawTemp
})
const displayFeelsLike = computed(() => {
  const rawTemp = props.cityItem.feelsLike
  if (rawTemp == null) return '-'
  return configStore.unit === 'fahrenheit' ? Math.round((rawTemp * 9) / 5 + 32) : Math.round(rawTemp)
})
const iconUrl = computed(() =>
  props.cityItem.weatherIcon
    ? `https://openweathermap.org/img/wn/${props.cityItem.weatherIcon}@2x.png`
    : '',
)
</script>

<template>
  <el-card class="weather-card" :class="{ selected: isSelected }" shadow="hover" @click="emit('select-card', cityItem)">
    <div class="card-header">
      <div><small>{{ cityItem.country || 'KR' }}</small><h3>{{ cityItem.name }}</h3><p>{{ cityItem.weather }}</p></div>
      <img v-if="iconUrl" :src="iconUrl" :alt="cityItem.weather" />
      <span v-else class="fallback-icon">🌤️</span>
    </div>
    <div class="temperature">{{ Math.round(displayTemp) }}<small>{{ configStore.unitSymbol }}</small></div>
    <div class="weather-stats">
      <div><small>체감온도</small><strong>{{ displayFeelsLike }}{{ configStore.unitSymbol }}</strong></div>
      <div><small>습도</small><strong>{{ cityItem.humidity }}</strong></div>
      <div><small>풍속</small><strong>{{ cityItem.wind }}</strong></div>
    </div>
    <div class="card-actions">
      <el-button type="primary" plain @click.stop="emit('click-detail', cityItem.id)">상세 날씨</el-button>
      <el-button type="danger" text @click.stop="emit('remove-city', cityItem)">도시 삭제</el-button>
    </div>
  </el-card>
</template>

<style scoped>
.weather-card { cursor: pointer; border: 1px solid #e2e8f0; border-radius: 14px; transition: transform .2s ease, box-shadow .2s ease; }.weather-card:hover,.weather-card.selected { transform: translateY(-3px); }.weather-card.selected { border-color: #409eff; box-shadow: 0 8px 24px rgba(64,158,255,.18); }.card-header { display: flex; align-items: center; justify-content: space-between; }.card-header h3,.card-header p { margin: 2px 0; }.card-header h3 { color: #1e293b; font-size: 20px; }.card-header p { color: #64748b; text-transform: capitalize; }.card-header small { color: #94a3b8; font-weight: 700; letter-spacing: .08em; }.card-header img { width: 80px; height: 80px; object-fit: contain; }.fallback-icon { font-size: 48px; }.temperature { margin: 4px 0 16px; color: #0f172a; font-size: 42px; font-weight: 800; }.temperature small { margin-left: 3px; color: #64748b; font-size: 18px; }.weather-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }.weather-stats div { display: grid; gap: 3px; padding: 8px; text-align: center; background: #f8fafc; border-radius: 8px; }.weather-stats small { color: #94a3b8; font-size: 11px; }.weather-stats strong { color: #334155; font-size: 13px; }.card-actions { display: flex; justify-content: space-between; margin-top: 14px; }
</style>
