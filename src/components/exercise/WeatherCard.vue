<script setup>
defineProps({
  cityItem: { type: Object, required: true },
  isSelected: { type: Boolean, default: false },
})
const emit = defineEmits(['select-card', 'click-detail'])
</script>

<template>
  <el-card class="weather-card" :class="{ selected: isSelected }" shadow="hover" @click="emit('select-card', cityItem)">
    <h4>{{ cityItem.name }} ({{ cityItem.weather }})</h4>
    <p>현재 기온: {{ cityItem.temp }}℃</p>
    <p class="stock-theme">📊 추천 섹터: {{ cityItem.stockTheme }}</p>
    <el-tag v-if="cityItem.temp >= 30" type="danger">🔥 매우 더움</el-tag>
    <el-tag v-else-if="cityItem.temp >= 25" type="warning">🌡️ 더움</el-tag>
    <el-tag v-else-if="cityItem.temp >= 20" type="success">🌤️ 쾌적함</el-tag>
    <el-tag v-else type="primary">❄️ 추움</el-tag>
    <el-button class="btn-detail" type="primary" plain @click.stop="emit('click-detail', cityItem.id)">상세보기</el-button>
  </el-card>
</template>

<style scoped>
.weather-card { position: relative; margin-bottom: 10px; cursor: pointer; }
.weather-card.selected { border-color: #3498db; box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.18); transform: translateY(-1px); }
.stock-theme { padding-right: 72px; color: #2980b9; font-weight: bold; }
.btn-detail { position: absolute; top: 15px; right: 12px; }
</style>
