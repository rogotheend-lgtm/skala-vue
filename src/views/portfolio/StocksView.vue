<script setup>
import { onMounted } from 'vue'
import { useStockStore } from '@/stores/stockStore'

const stockStore = useStockStore()
const formatNumber = (value) => (value == null ? '-' : value.toLocaleString('ko-KR'))
const formatBaseDate = (value) => value ? `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}` : '-'

onMounted(() => stockStore.loadStocks())
</script>

<template>
  <section>
    <div class="title-row">
      <div><h2>📈 지역 연관 KOSDAQ 종목</h2><p>KRX 종가 기준일: {{ formatBaseDate(stockStore.baseDate) }} · 한국시간 기준 최근 공개 거래일</p></div>
      <el-button type="primary" :loading="stockStore.isLoading" @click="stockStore.loadStocks({ force: true })">새로고침</el-button>
    </div>
    <p v-if="stockStore.isLoading">KRX 데이터를 불러오는 중입니다...</p>
    <p v-if="stockStore.errorMessage" class="error">{{ stockStore.errorMessage }}</p>
    <div class="stock-grid">
      <el-card v-for="stock in stockStore.regionalStocks" :key="stock.code" shadow="hover">
        <span class="region">{{ stock.region }}</span>
        <h3>{{ stock.name || stock.fallbackName }}</h3>
        <small>{{ stock.code }} · KOSDAQ</small>
        <strong>{{ formatNumber(stock.closePrice) }}원</strong>
        <p :class="{ up: stock.changeRate > 0, down: stock.changeRate < 0 }">
          {{ stock.changeRate == null ? 'KRX 시세 연결 대기' : `전 거래일 대비 ${stock.changeRate > 0 ? '+' : ''}${stock.changeRate}%` }}
        </p>
        <small>거래량 {{ formatNumber(stock.volume) }}</small>
      </el-card>
    </div>
  </section>
</template>

<style scoped>
.title-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; }.title-row h2 { margin-bottom: 4px; font-size: 28px; }.title-row p { margin: 0; color: #64748b; }.error { padding: 10px; color: #b45309; background: #fffbeb; border-radius: 6px; }.stock-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 12px; margin-top: 18px; }.stock-grid .el-card { border-radius: 13px; }.stock-grid :deep(.el-card__body) { display: grid; gap: 5px; }.stock-grid h3,.stock-grid p { margin: 0; }.stock-grid strong { margin-top: 8px; color: #0f172a; font-size: 22px; }.stock-grid small { color: #64748b; }.region { width: fit-content; padding: 3px 7px; color: #1d4ed8; font-size: 12px; background: #dbeafe; border-radius: 20px; }.up { color: #dc2626; }.down { color: #2563eb; }@media (max-width: 850px) { .stock-grid { grid-template-columns: repeat(2,1fr); } }@media (max-width: 600px) { .stock-grid { grid-template-columns: 1fr; }.title-row { align-items: flex-start; flex-direction: column; } }
</style>
