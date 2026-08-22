import axios from 'axios'
import process from 'node:process'

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ message: 'Method Not Allowed' })
  }

  const baseDate = request.query.basDd
  if (!/^\d{8}$/.test(baseDate || '')) {
    return response.status(400).json({ message: 'basDd는 YYYYMMDD 형식이어야 합니다.' })
  }

  if (!process.env.KRX_AUTH_KEY) {
    return response.status(500).json({ message: 'KRX 환경 변수가 설정되지 않았습니다.' })
  }

  try {
    const krxResponse = await axios.get(
      'https://data-dbg.krx.co.kr/svc/apis/sto/ksq_bydd_trd',
      {
        params: { basDd: baseDate },
        headers: { AUTH_KEY: process.env.KRX_AUTH_KEY },
        timeout: 15000,
      },
    )

    response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
    return response.status(200).json(krxResponse.data)
  } catch (error) {
    console.error('KRX API request failed:', error.message)
    return response.status(502).json({ message: 'KRX 데이터를 불러오지 못했습니다.' })
  }
}
