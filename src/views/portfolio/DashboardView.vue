<template>
  <section>
    <div class="hero"><div><p>SMART WEATHER × KOSDAQ</p><h2>오늘의 날씨를<br />투자 시뮬레이션으로.</h2><span>OpenWeather와 KRX 데이터를 바탕으로 가상 포트폴리오를 운용합니다.</span></div><div class="hero-orb">☀️<small>LIVE DATA</small></div></div>
    <div class="summary-grid">
      <RouterLink to="/weather"><el-card class="summary-card" shadow="hover"><span>🌦️</span><strong>날씨 분석</strong><small>도시 추가·삭제와 실시간 날씨</small><b>둘러보기 →</b></el-card></RouterLink>
      <RouterLink to="/stocks"><el-card class="summary-card" shadow="hover"><span>📈</span><strong>국내 종목</strong><small>KRX 종가와 지역 관심종목</small><b>둘러보기 →</b></el-card></RouterLink>
      <RouterLink to="/portfolio"><el-card class="summary-card" shadow="hover"><span>💼</span><strong>가상 포트폴리오</strong><small>잔액·매수·매도·날씨 신호</small><b>둘러보기 →</b></el-card></RouterLink>
      <RouterLink to="/alerts"><el-card class="summary-card" shadow="hover"><span>🚨</span><strong>이상거래 감지</strong><small>watch 기반 실시간 모니터링</small><b>둘러보기 →</b></el-card></RouterLink>
    </div>
  </section>
</template>

<style scoped>
.hero { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 34px; margin-bottom: 18px; color: #fff; background: linear-gradient(125deg,#172554,#1d4ed8 58%,#38bdf8); border-radius: 20px; overflow: hidden; }.hero p { margin: 0 0 8px; color: #bfdbfe; font-size: 11px; font-weight: 800; letter-spacing: .14em; }.hero h2 { margin: 0 0 12px; font-size: clamp(28px,5vw,48px); line-height: 1.08; letter-spacing: -.05em; }.hero span { color: #dbeafe; }.hero-orb { display: grid; flex: 0 0 150px; place-items: center; aspect-ratio: 1; font-size: 62px; background: rgba(255,255,255,.14); border: 1px solid rgba(255,255,255,.25); border-radius: 50%; box-shadow: inset 0 0 40px rgba(255,255,255,.12); }.hero-orb small { font-size: 9px; letter-spacing: .15em; }.summary-grid { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 12px; }.summary-card { height: 100%; border: 1px solid #e2e8f0; border-radius: 14px; }.summary-card :deep(.el-card__body) { display: grid; gap: 7px; height: 100%; }.summary-card span { font-size: 29px; }.summary-card strong { color: #1e293b; font-size: 16px; }.summary-card small { min-height: 34px; color: #64748b; }.summary-card b { color: #2563eb; font-size: 12px; }@media (max-width: 850px) { .summary-grid { grid-template-columns: repeat(2,1fr); } }@media (max-width: 560px) { .summary-grid { grid-template-columns: 1fr; }.hero-orb { display: none; }.hero { padding: 25px; } }
</style>
