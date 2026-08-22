<script setup>
import { onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useStockStore } from '@/stores/stockStore'
import { useWeatherStore } from '@/stores/weatherStore'

const portfolioStore = usePortfolioStore()
const stockStore = useStockStore()
const weatherStore = useWeatherStore()
const money = (value) => Math.round(value || 0).toLocaleString('ko-KR')
const formatBaseDate = (value) => value ? `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}` : '시세 대기'

onMounted(async () => {
  await Promise.all([stockStore.loadStocks(), weatherStore.loadAllWeather()])
})

async function confirmUnlock(position) {
  try {
    await ElMessageBox.confirm(
      `${position.name}의 매수·매도 제한을 해제하시겠습니까?`,
      '거래 잠금 해제 확인',
      { confirmButtonText: '확인', cancelButtonText: '취소', type: 'warning' },
    )
    portfolioStore.unlockStock(position.code)
    ElMessage.success('거래 잠금이 해제되었습니다.')
  } catch {
    // 사용자가 취소한 경우 잠금을 유지한다.
  }
}
</script>

<template>
  <section>
    <div class="title-row">
      <div><h2>💼 날씨 기반 가상 포트폴리오</h2><p>평가 기준: {{ formatBaseDate(stockStore.baseDate) }} KRX 종가 · 수익률은 임의 평균매수가 대비</p></div>
      <el-button plain @click="portfolioStore.resetPortfolio">포트폴리오 초기화</el-button>
    </div>
    <div class="asset-summary">
      <article><small>총자산</small><strong>{{ money(portfolioStore.totalAssets) }}원</strong></article>
      <article><small>주식 평가액</small><strong>{{ money(portfolioStore.stockEvaluation) }}원</strong></article>
      <article><small>가상 현금</small><strong>{{ money(portfolioStore.cash) }}원</strong></article>
    </div>
    <div class="positions">
      <article v-for="position in portfolioStore.positions" :key="position.code">
        <div class="position-title"><span class="region">{{ position.region }}</span><strong>{{ position.name }}</strong><small>{{ position.code }}</small></div>
        <div class="numbers"><span>{{ position.quantity }}주 · 평균 {{ money(position.averagePrice) }}원</span><span>기준일 종가 {{ money(position.currentPrice) }}원</span><span :class="{ up: position.profit >= 0, down: position.profit < 0 }">평균매수가 대비 {{ position.profit >= 0 ? '+' : '' }}{{ money(position.profit) }}원 ({{ position.profitRate.toFixed(2) }}%)</span></div>
        <div class="weather-signal" :class="position.signal.action.toLowerCase()">
          <span>{{ position.weather || '날씨 대기' }}</span>
          <strong>{{ position.signal.label }}</strong>
          <small>{{ position.signal.reason }}</small>
        </div>
        <div class="trade-actions">
          <template v-if="portfolioStore.isStockBlocked(position.code)">
            <el-tag type="danger" effect="dark">거래 잠김</el-tag>
            <el-button type="warning" plain @click="confirmUnlock(position)">잠금 해제</el-button>
          </template>
          <template v-else>
            <el-button type="primary" :disabled="portfolioStore.cash < position.currentPrice" @click="portfolioStore.buyOne(position.code)">매수</el-button>
            <el-button type="danger" :disabled="position.quantity < 1" @click="portfolioStore.sellOne(position.code)">매도</el-button>
          </template>
        </div>
      </article>
    </div>
    <div v-if="portfolioStore.transactions.length" class="transactions">
      <h3>최근 가상 거래</h3>
      <p v-for="trade in portfolioStore.transactions" :key="trade.id">{{ trade.type }} · {{ trade.name }} {{ trade.quantity }}주 · {{ money(trade.price) }}원</p>
    </div>
  </section>
</template>

<style scoped>
.title-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; }.title-row h2,.title-row p { margin: 0 0 5px; }.title-row h2 { font-size: 28px; }.title-row p { color: #64748b; }.asset-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 18px 0; }.asset-summary article { display: grid; gap: 5px; padding: 18px; background: linear-gradient(135deg,#eff6ff,#f8fbff); border: 1px solid #dbeafe; border-radius: 13px; }.asset-summary small { color: #64748b; }.asset-summary strong { font-size: 21px; }.positions { display: grid; gap: 10px; }.positions > article { display: grid; grid-template-columns: 1.2fr 1.3fr 1.4fr auto; align-items: center; gap: 12px; padding: 16px; background: #fff; border: 1px solid #e5e7eb; border-radius: 13px; box-shadow: 0 5px 18px rgba(15,23,42,.04); }.position-title,.numbers,.weather-signal { display: grid; gap: 3px; }.position-title small,.numbers { color: #64748b; font-size: 13px; }.region { width: fit-content; color: #2563eb; font-size: 11px; }.weather-signal { padding: 8px; border-radius: 6px; }.weather-signal.sell { color: #991b1b; background: #fee2e2; }.weather-signal.buy { color: #166534; background: #dcfce7; }.weather-signal.neutral { color: #475569; background: #f1f5f9; }.trade-actions { display: flex; gap: 4px; }.trade-actions .el-button + .el-button { margin-left: 0; }.up { color: #dc2626; }.down { color: #2563eb; }.transactions { padding: 14px; margin-top: 16px; background: #f8fafc; border-radius: 8px; }.transactions p { font-size: 13px; }@media (max-width: 760px) { .asset-summary { grid-template-columns: 1fr; }.positions > article { grid-template-columns: 1fr; }.title-row { align-items: flex-start; flex-direction: column; } }
</style>
