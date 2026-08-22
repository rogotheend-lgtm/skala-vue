<script setup>
import { useConfigStore } from '@/stores/configStore'
const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>날씨 단위: <strong>{{ configStore.unitSymbol }}</strong></span>
    <button class="toggle-btn" @click="configStore.toggleUnit">단위변경</button>
  </div>
</template>

<style scoped>
.unit-toggler { display: inline-flex; align-items: center; gap: 8px; margin-left: auto; color: #4b5563; font-size: 13px; white-space: nowrap; }
.toggle-btn { padding: 6px 10px; color: white; font-weight: bold; cursor: pointer; background: #4b6584; border: none; border-radius: 4px; }
</style>
