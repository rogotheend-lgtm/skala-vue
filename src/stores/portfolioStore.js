import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { regionalCompanies } from '@/data/regionalCompanies'
import { useStockStore } from '@/stores/stockStore'
import { useWeatherStore } from '@/stores/weatherStore'

const initialHoldings = [
  { code: '035900', quantity: 12, averagePrice: 38000 },
  { code: '058470', quantity: 4, averagePrice: 66000 },
  { code: '083930', quantity: 18, averagePrice: 12000 },
  { code: '046970', quantity: 80, averagePrice: 4200 },
  { code: '099320', quantity: 5, averagePrice: 70000 },
  { code: '277810', quantity: 3, averagePrice: 315000 },
  { code: '137400', quantity: 6, averagePrice: 42000 },
  { code: '067570', quantity: 20, averagePrice: 2800 },
]

function getWeatherSignal(weather = '') {
  const value = weather.toLowerCase()
  const riskyWords = ['cloud', 'overcast', 'rain', 'drizzle', 'thunder', 'snow', 'mist', 'fog']
  if (riskyWords.some((word) => value.includes(word))) {
    return { action: 'SELL', label: '매도', reason: `${weather} 날씨를 위험 신호로 감지` }
  }
  if (value.includes('clear')) {
    return { action: 'BUY', label: '매수', reason: `${weather} 날씨를 긍정 신호로 감지` }
  }
  return { action: 'NEUTRAL', label: '중립', reason: weather || '날씨 데이터 없음' }
}

function isWeatherContraryTrade(transaction) {
  return (
    (transaction.weatherSignal === 'SELL' && transaction.type === '매수') ||
    (transaction.weatherSignal === 'BUY' && transaction.type === '매도')
  )
}

export const usePortfolioStore = defineStore('portfolio', () => {
  const stockStore = useStockStore()
  const weatherStore = useWeatherStore()
  const cash = ref(5000000)
  const holdings = ref(initialHoldings.map((holding) => ({ ...holding })))
  const transactions = ref([])
  const alerts = ref([])
  const blockedStockCodes = ref([])
  const unlockedAtByCode = ref({})
  const processedTransactionIds = new Set()

  const positions = computed(() =>
    holdings.value.map((holding) => {
      const company = regionalCompanies.find((item) => item.code === holding.code)
      const stock = stockStore.stocks.find((item) => item.code === holding.code)
      const weather = weatherStore.weatherList.find((item) => item.engName === company?.cityKey)
      const currentPrice = stock?.closePrice ?? holding.averagePrice
      const evaluationAmount = currentPrice * holding.quantity
      const purchaseAmount = holding.averagePrice * holding.quantity
      return {
        ...holding,
        ...company,
        name: stock?.name || company?.fallbackName || holding.code,
        currentPrice,
        evaluationAmount,
        profit: evaluationAmount - purchaseAmount,
        profitRate: purchaseAmount ? ((evaluationAmount - purchaseAmount) / purchaseAmount) * 100 : 0,
        weather: weather?.weather || '',
        signal: getWeatherSignal(weather?.weather),
      }
    }),
  )

  const stockEvaluation = computed(() =>
    positions.value.reduce((total, position) => total + position.evaluationAmount, 0),
  )
  const totalAssets = computed(() => cash.value + stockEvaluation.value)

  function isStockBlocked(code) {
    const position = positions.value.find((item) => item.code === code)
    return blockedStockCodes.value.includes(code) && position?.signal.action !== 'NEUTRAL'
  }

  function addAlert(type, title, transaction, description) {
    alerts.value.unshift({
      id: `${transaction?.id || Date.now()}-${type}`,
      type,
      title,
      description,
      transaction,
      createdAt: new Date(),
    })
  }

  watch(
    transactions,
    (currentTransactions) => {
      const transaction = currentTransactions[0]
      if (!transaction || processedTransactionIds.has(transaction.id)) return
      processedTransactionIds.add(transaction.id)

      const recentContraryTrades = currentTransactions.filter(
        (item) =>
          item.code === transaction.code &&
          isWeatherContraryTrade(item) &&
          item.createdAt > (unlockedAtByCode.value[transaction.code] || 0) &&
          transaction.createdAt - item.createdAt <= 60000,
      )
      if (
        isWeatherContraryTrade(transaction) &&
        recentContraryTrades.length >= 5 &&
        !blockedStockCodes.value.includes(transaction.code)
      ) {
        blockedStockCodes.value.push(transaction.code)
        addAlert('blocked', '날씨 역행 반복거래 잠금', transaction, '날씨 신호에 역행한 거래가 같은 종목에서 1분 안에 5회 발생했습니다.')
      }
    },
    { deep: true },
  )

  watch(cash, (currentCash, previousCash) => {
    if (currentCash < 500000 && previousCash >= 500000) {
      addAlert('balance', '잔액 위험 감지', null, `가상 현금이 ${currentCash.toLocaleString('ko-KR')}원으로 감소했습니다.`)
    }
  })

  function buyOne(code) {
    const holding = holdings.value.find((item) => item.code === code)
    const position = positions.value.find((item) => item.code === code)
    if (!holding || !position || isStockBlocked(code) || cash.value < position.currentPrice) return false
    if (position.signal.action === 'NEUTRAL' && blockedStockCodes.value.includes(code)) unlockStock(code)

    const previousAmount = holding.averagePrice * holding.quantity
    holding.quantity += 1
    holding.averagePrice = (previousAmount + position.currentPrice) / holding.quantity
    cash.value -= position.currentPrice
    transactions.value.unshift({
      id: Date.now(),
      createdAt: Date.now(),
      type: '매수',
      code,
      name: position.name,
      quantity: 1,
      price: position.currentPrice,
      reason: '사용자 직접 매수',
      weather: position.weather,
      weatherSignal: position.signal.action,
    })
    return true
  }

  function sellOne(code) {
    const holding = holdings.value.find((item) => item.code === code)
    const position = positions.value.find((item) => item.code === code)
    if (!holding || !position || isStockBlocked(code) || holding.quantity < 1) return false
    if (position.signal.action === 'NEUTRAL' && blockedStockCodes.value.includes(code)) unlockStock(code)

    holding.quantity -= 1
    cash.value += position.currentPrice
    transactions.value.unshift({
      id: Date.now(),
      createdAt: Date.now(),
      type: '매도',
      code,
      name: position.name,
      quantity: 1,
      price: position.currentPrice,
      reason: position.signal.reason,
      weather: position.weather,
      weatherSignal: position.signal.action,
    })
    return true
  }

  function resetPortfolio() {
    cash.value = 5000000
    holdings.value = initialHoldings.map((holding) => ({ ...holding }))
    transactions.value = []
    alerts.value = []
    blockedStockCodes.value = []
    unlockedAtByCode.value = {}
    processedTransactionIds.clear()
  }

  function clearAlerts() {
    alerts.value = []
  }

  function unlockStock(code) {
    blockedStockCodes.value = blockedStockCodes.value.filter((item) => item !== code)
    unlockedAtByCode.value[code] = Date.now()
  }

  return { cash, holdings, transactions, alerts, blockedStockCodes, positions, stockEvaluation, totalAssets, isStockBlocked, buyOne, sellOne, resetPortfolio, clearAlerts, unlockStock }
})
