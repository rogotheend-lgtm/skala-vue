<script setup>
import UnitToggler from './components/exercise/store/UnitToggler.vue'
</script>

<template>
  <div class="app-container">
    <h1>🌤️ 종합실습 5: 스토어적용</h1>
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
      <main><RouterView /></main>
    </div>
  </div>
</template>
