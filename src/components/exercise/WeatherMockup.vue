<script setup>
import { ref } from 'vue'

const weatherList = ref([
    {id: 'city_01', name: '서울', weather: '맑음', temp: 25},
    {id: 'city_02', name: '부산', weather: '흐림', temp: 22},
    {id: 'city_03', name: '대구', weather: '비', temp: 32},
    {id: 'city_04', name: '인천', weather: '맑음', temp: 24},
    {id: 'city_05', name: '광주', weather: '흐림', temp: 30},
    {id: 'city_06', name: '대전', weather: '비', temp: 19},
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요')

const showDetail = (cityName, weather) => {
    window.alert(`${cityName}의 현재 날씨는 [${weather}] 상태입니다.`)
}
</script>

<template>
    <div class="dashboard-wrapper">
        <section class="search-box">
            <h3> 도시 검색</h3>
            <input type="text" :value="searchQuery" @input="(e) => (searchQuery = e.target.value)" placeholder="도시 이름을 입력" />
            <p>
                검색 중인 도시: <strong>{{ searchQuery }}</strong>
            </p>
        </section>
        <section class="list-box">
      <h3>🏙️ 지역별 날씨 현황</h3>

      <div v-for="item in weatherList" :key="item.id" class="weather-card" @click="selectedCityInfo = `${item.name}이 선택되었습니다.`">
        <h4>{{ item.name }} ({{ item.weather }})</h4>
        <p>현재 기온: {{ item.temp }}°C</p>

        <span v-if="item.temp >= 30" class="badge hot">🔥 녹아내림 (30도 이상)</span>
        <span v-else-if="item.temp >= 25" class="badge warm">🌡️ 더움 (25도 이상 30도 미만)</span>
        <span v-else-if="item.temp >= 20" class="badge normal">🌤️ 쾌적함 (20도 이상 25도 미만)</span>
        <span v-else class="badge cold">❄️ 추움 (20도 미만)</span>

        <button class="btn-detail" @click.stop="showDetail(item.name, item.weather)">상세보기</button>
      </div>
    </section>

    <div class="weather-feedback-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>
