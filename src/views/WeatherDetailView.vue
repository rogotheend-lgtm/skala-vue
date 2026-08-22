<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { weatherMockData } from '@/data/weatherMockData'

const route = useRoute()
const router = useRouter()
const cityData = ref(null)
onMounted(() => {
  cityData.value = weatherMockData.find((city) => city.id === route.params.cityId) ?? null
})
</script>

<template>
  <el-card class="detail-container" shadow="always">
    <h3>📊 지역별 상세 기상 관측 정보</h3><hr />
    <el-descriptions v-if="cityData" :column="1" border>
      <el-descriptions-item label="지정 지역">{{ cityData.detailName }}</el-descriptions-item>
      <el-descriptions-item label="실시간 기온">{{ cityData.temp }}℃</el-descriptions-item>
      <el-descriptions-item label="기상 현황">{{ cityData.weather }}</el-descriptions-item>
      <el-descriptions-item label="습도 / 풍속">{{ cityData.humidity }} / {{ cityData.wind }}</el-descriptions-item>
      <el-descriptions-item label="추천 섹터">{{ cityData.stockTheme }}</el-descriptions-item>
    </el-descriptions>
    <el-empty v-else description="해당 지역의 상세 데이터가 존재하지 않습니다." />
    <el-button class="back-btn" type="primary" @click="router.push('/')">← 메인 대시보드로 돌아가기</el-button>
  </el-card>
</template>

<style scoped>
.detail-container { margin: 0 auto; }.back-btn { margin-top: 16px; }
</style>
