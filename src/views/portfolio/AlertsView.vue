<script setup>
import { usePortfolioStore } from '@/stores/portfolioStore'

const portfolioStore = usePortfolioStore()
const time = (value) => new Intl.DateTimeFormat('ko-KR', {
  hour: '2-digit', minute: '2-digit', second: '2-digit',
}).format(value)
const tagType = (type) => ({ blocked: 'danger', balance: 'danger' }[type] || 'info')
</script>

<template>
  <section class="alerts-page">
    <div class="page-heading">
      <div><p class="eyebrow">WATCH MONITORING</p><h2>이상거래 감지</h2><span>Pinia 거래내역을 Vue watch로 실시간 감시합니다.</span></div>
      <el-button v-if="portfolioStore.alerts.length" type="danger" plain @click="portfolioStore.clearAlerts">알림 비우기</el-button>
    </div>

    <div class="rule-grid">
      <el-card shadow="never"><strong>날씨 역행 AND 5회</strong><span>같은 종목·1분 이내일 때만 잠금</span></el-card>
      <el-card shadow="never"><strong>₩500,000 미만</strong><span>가상 현금 부족</span></el-card>
    </div>

    <el-empty v-if="!portfolioStore.alerts.length" description="감지된 이상거래가 없습니다. 포트폴리오에서 거래해 보세요." />
    <el-timeline v-else class="alert-timeline">
      <el-timeline-item v-for="alert in portfolioStore.alerts" :key="alert.id" :timestamp="time(alert.createdAt)" placement="top" type="danger">
        <el-card shadow="hover">
          <div class="alert-title"><el-tag :type="tagType(alert.type)">{{ alert.title }}</el-tag><strong v-if="alert.transaction">{{ alert.transaction.name }} · {{ alert.transaction.type }}</strong></div>
          <p>{{ alert.description }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </section>
</template>

<style scoped>
.alerts-page { display: grid; gap: 20px; }.page-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; }.page-heading h2 { margin: 2px 0 5px; font-size: 28px; }.page-heading span { color: #64748b; }.eyebrow { margin: 0; color: #ef4444; font-size: 11px; font-weight: 800; letter-spacing: .14em; }.rule-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }.rule-grid :deep(.el-card__body) { display: grid; gap: 5px; }.rule-grid strong { color: #0f172a; font-size: 18px; }.rule-grid span { color: #64748b; font-size: 12px; }.alert-timeline { padding-top: 8px; }.alert-title { display: flex; align-items: center; gap: 9px; }.alert-timeline p { margin-bottom: 0; color: #64748b; }@media (max-width: 760px) { .rule-grid { grid-template-columns: 1fr; }.page-heading { align-items: flex-start; flex-direction: column; } }
</style>
