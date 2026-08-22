<script setup>
import { Search } from '@element-plus/icons-vue'
// 1. 상위로 입력 텍스트를 전달할 커스텀 이벤트 등록 (매크로)
defineEmits(['update-query', 'search'])

// 2. 상위로부터 현재 검색 상태 값을 수신 (한글 동기화 상태 유지용)
defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="search-inner">
    <h3>🔍 도시 검색</h3>
    <div class="search-controls">
      <el-input :model-value="currentQuery" clearable size="large" placeholder="도시 이름 입력 (서울 또는 Seoul)" @update:model-value="$emit('update-query', $event)" @keyup.enter="$emit('search')">
        <template #prefix><el-icon><Search /></el-icon></template>
      </el-input>
      <el-button type="primary" size="large" :icon="Search" @click="$emit('search')">전 세계 도시 찾기</el-button>
    </div>
    <p>
      <template v-if="currentQuery">검색어: <strong>{{ currentQuery }}</strong></template>
      <template v-else>한글 또는 영어로 입력하고 검색 버튼을 눌러 주세요.</template>
    </p>
  </div>
</template>

<style scoped>
.search-controls { display: flex; gap: 8px; }.search-controls .el-input { flex: 1; }.search-controls .el-button { white-space: nowrap; }
@media (max-width: 520px) { .search-controls { flex-direction: column; } }
</style>
