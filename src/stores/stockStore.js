import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { regionalCompanies } from '@/data/regionalCompanies'
import { getLatestKosdaqDailyTrading } from '@/services/krxApi'

export const useStockStore = defineStore('stock', () => {
  const stocks = ref([])
  const baseDate = ref('')
  const isLoading = ref(false)
  const errorMessage = ref('')
  const hasLoaded = ref(false)

  const regionalStocks = computed(() =>
    regionalCompanies.map((company) => {
      const stock = stocks.value.find((item) => item.code === company.code)
      return { ...company, ...stock }
    }),
  )

  async function loadStocks({ force = false } = {}) {
    if (hasLoaded.value && !force) return

    try {
      isLoading.value = true
      errorMessage.value = ''
      const result = await getLatestKosdaqDailyTrading()
      baseDate.value = result.baseDate
      stocks.value = result.rows.map((row) => ({
        code: row.ISU_SRT_CD ?? row.ISU_CD,
        name: row.ISU_NM,
        closePrice: Number(row.TDD_CLSPRC.replaceAll(',', '')),
        changePrice: Number(row.CMPPREVDD_PRC.replaceAll(',', '')),
        changeRate: Number(row.FLUC_RT),
        volume: Number(row.ACC_TRDVOL.replaceAll(',', '')),
      }))
    } catch (error) {
      stocks.value = []
      errorMessage.value = 'KRX 종목 데이터를 불러오지 못했습니다.'
      console.error(error)
    } finally {
      hasLoaded.value = true
      isLoading.value = false
    }
  }

  function getCompaniesByCity(cityName) {
    return regionalCompanies
      .filter((company) => company.cityKey === cityName?.toLowerCase())
      .map((company) => {
        const stock = stocks.value.find((item) => item.code === company.code)
        return { ...company, ...stock }
      })
  }

  return {
    stocks,
    regionalStocks,
    baseDate,
    isLoading,
    errorMessage,
    loadStocks,
    getCompaniesByCity,
  }
})
