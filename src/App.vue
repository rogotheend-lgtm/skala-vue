<script setup>
import { watchEffect, onUnmounted } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import UnitToggler from '@/components/exercise/store/UnitToggler.vue'

const configStore = useConfigStore()

watchEffect(() => {
  document.body.classList.toggle('store-dark-mode', configStore.isDarkMode)
})

onUnmounted(() => document.body.classList.remove('store-dark-mode'))
</script>

<template>
  <div class="app-container store-app" :class="{ 'dark-mode': configStore.isDarkMode }">
    <header class="portfolio-header">
      <div>
        <p class="eyebrow">WEATHER INVESTMENT SIMULATOR</p>
        <h1>⛅ 날씨 기반 가상투자 시스템</h1>
      </div>
      <UnitToggler />
    </header>

    <el-menu
      router
      mode="horizontal"
      :default-active="$route.path"
      :ellipsis="false"
      class="portfolio-navigation"
      aria-label="주요 메뉴"
    >
      <el-menu-item index="/">📊 대시보드</el-menu-item>
      <el-menu-item index="/weather">🌦️ 날씨</el-menu-item>
      <el-menu-item index="/stocks">📈 종목</el-menu-item>
      <el-menu-item index="/portfolio">💼 포트폴리오</el-menu-item>
      <el-menu-item index="/alerts">🚨 이상거래</el-menu-item>
    </el-menu>

    <main class="portfolio-content">
      <RouterView />
    </main>

    <footer class="portfolio-footer">
      교육용 가상투자 시뮬레이션이며 실제 투자 주문이나 투자 권유가 아닙니다.
    </footer>
  </div>
</template>

<style scoped>
.store-app { padding: 24px; background: rgba(255,255,255,.82); border: 1px solid rgba(226,232,240,.9); border-radius: 24px; box-shadow: 0 24px 70px rgba(30,64,175,.10); backdrop-filter: blur(12px); }.portfolio-header { display: flex; align-items: center; justify-content: space-between; gap: 20px; }.portfolio-header h1 { margin: 4px 0 0; color: #0f172a; font-size: clamp(24px, 4vw, 36px); letter-spacing: -.04em; }
.eyebrow { margin: 0; color: #3498db; font-size: 11px; font-weight: 800; letter-spacing: .12em; }
.portfolio-navigation { padding: 0 10px; margin: 18px 0 22px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 10px; }
.portfolio-navigation.el-menu--horizontal { height: 54px; border-bottom: 1px solid #e5e7eb; }
.portfolio-navigation .el-menu-item { font-weight: 700; }
.portfolio-content { min-height: 420px; }
.portfolio-footer { padding-top: 20px; margin-top: 24px; color: #64748b; font-size: 12px; text-align: center; border-top: 1px solid #e5e7eb; }
.dark-mode .portfolio-navigation { background: #273449; border-color: #4b5563; }
.dark-mode .portfolio-navigation { --el-menu-bg-color: #273449; --el-menu-text-color: #d1d5db; --el-menu-active-color: #60a5fa; }
.dark-mode .portfolio-footer { color: #9ca3af; border-color: #4b5563; }
@media (max-width: 640px) { .portfolio-header { align-items: flex-start; flex-direction: column; } }
</style>
