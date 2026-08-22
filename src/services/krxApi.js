import axios from 'axios'

const krxApi = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

function formatDate(date) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

function getKoreaToday() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return new Date(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day)))
}

export async function getKosdaqDailyTrading(baseDate) {
  const response = await krxApi.get('/krx', {
    params: { basDd: baseDate },
  })
  return response.data?.OutBlock_1 ?? []
}

// 휴일이나 당일 미공개 상황을 고려해 최근 데이터가 있는 날까지 거슬러 올라간다.
export async function getLatestKosdaqDailyTrading(maxLookbackDays = 10) {
  const koreaToday = getKoreaToday()
  for (let offset = 0; offset < maxLookbackDays; offset += 1) {
    const targetDate = new Date(koreaToday)
    targetDate.setUTCDate(targetDate.getUTCDate() - offset)
    const baseDate = formatDate(targetDate)
    const rows = await getKosdaqDailyTrading(baseDate)

    if (rows.length) return { baseDate, rows }
  }

  throw new Error('최근 KOSDAQ 일별매매정보를 찾지 못했습니다.')
}
