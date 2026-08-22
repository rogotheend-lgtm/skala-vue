// 교육용 지역 관심종목 목록. 종목명과 가격은 KRX 응답을 우선 사용한다.
export const regionalCompanies = [
  { code: '035900', fallbackName: 'JYP Ent.', region: '서울', cityKey: 'seoul' },
  { code: '035760', fallbackName: 'CJ ENM', region: '서울', cityKey: 'seoul' },
  { code: '253450', fallbackName: '스튜디오드래곤', region: '서울', cityKey: 'seoul' },
  { code: '078340', fallbackName: '컴투스', region: '서울', cityKey: 'seoul' },
  { code: '058470', fallbackName: '리노공업', region: '부산', cityKey: 'busan' },
  { code: '083930', fallbackName: '아바코', region: '대구', cityKey: 'daegu' },
  { code: '010240', fallbackName: '흥국', region: '대구', cityKey: 'daegu' },
  { code: '003100', fallbackName: '선광', region: '인천', cityKey: 'incheon' },
  { code: '025440', fallbackName: 'DH오토웨어', region: '광주', cityKey: 'gwangju' },
  { code: '046970', fallbackName: '우리로', region: '광주', cityKey: 'gwangju' },
  { code: '099320', fallbackName: '쎄트렉아이', region: '대전', cityKey: 'daejeon' },
  { code: '277810', fallbackName: '레인보우로보틱스', region: '대전', cityKey: 'daejeon' },
  { code: '064550', fallbackName: '바이오니아', region: '대전', cityKey: 'daejeon' },
  { code: '137400', fallbackName: '피엔티', region: '구미', cityKey: 'gumi' },
  { code: '074600', fallbackName: '원익QnC', region: '구미', cityKey: 'gumi' },
  { code: '263600', fallbackName: '덕우전자', region: '구미', cityKey: 'gumi' },
  { code: '067570', fallbackName: '엔브이에이치코리아', region: '울산', cityKey: 'ulsan' },
  { code: '077360', fallbackName: '덕산하이메탈', region: '울산', cityKey: 'ulsan' },
]

export function getRegionalCompanies(cityName = '') {
  const cityKey = cityName.toLowerCase()
  return regionalCompanies.filter((company) => company.cityKey === cityKey)
}
