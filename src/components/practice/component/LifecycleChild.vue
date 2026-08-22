<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

const count = ref(0)
let timerId = null 

console.log('1. [setup] 컴포넌트가 메모리에 생성되었습니다. (DOM 접근 불가능)')

onMounted(() => {
  console.log('2. [onMounted] 컴포넌트가 화면에 마운트되었습니다. (DOM 접근 가능)')
  timerId = setInterval(() => {
    count.value++
  }, 3000)
})

onUpdated(() => {
  console.log(`3. [onUpdated] 데이터가 변경되어 화면을 새로 그렸습니다. (현재 count: ${count.value})`)
  if (count.value >= 10) {
    console.log('⚠️ count가 10 이상이므로 타이머를 종료합니다.')
    clearInterval(timerId)
  }
})

onUnmounted(() => {
  console.log('4. [onUnmounted] 컴포넌트가 화면에서 제거되었습니다.')
  clearInterval(timerId)
})
</script>

<template>
    <h3> 라이프사이클 훅 흐름 탐색기</h3>
  <div class="counter-display">
    <p>실시간 타이머 카운트: {{ count }}</p>
    <button @click="count++">수동으로 숫자 올리기</button>
    
  </div>
</template>

<style scoped>
.counter-display {
  background: #e3fafc;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #99e9f2;
  text-align: center;
}
</style>