<script setup>
import { watchEffect, onUnmounted } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import UnitToggler from './components/exercise/store/UnitToggler.vue'

const configStore = useConfigStore()

watchEffect(() => {
  document.body.classList.toggle('store-dark-mode', configStore.isDarkMode)
})

onUnmounted(() => {
  document.body.classList.remove('store-dark-mode')
})
</script>

<template>
  <div class="app-container store-app" :class="{ 'dark-mode': configStore.isDarkMode }">
    <h1>⛅ 과제 5: 스토어적용</h1>
    <hr />

    <div class="dashboard-wrapper">
      <nav class="navigation-bar">
        <div class="navigation-links">
          <RouterLink to="/" class="nav-item">🌦️ 날씨 대시보드</RouterLink>
          <span class="divider">|</span>
          <RouterLink to="/about" class="nav-item">ℹ️ 서비스 소개</RouterLink>
        </div>

        <UnitToggler />
      </nav>

      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>
