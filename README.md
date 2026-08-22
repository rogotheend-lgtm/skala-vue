# skala-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
### 나만의 커스텀 추가 (과제 1번)
1.도시 데이터 확장 
- 기본 3개 도시 외에 도시 3개(인천,광주,대전)추가 

2. 온도 분류 세분화
-기존 2단계 (더움,신선함)에서 4단계 ( 녹아내림,더움, 쾌적함, 추움)로 'v-else-if'를 활용하여 세분화.

### 나만의 커스텀 (과제 2번)
1. 도시 관련 주식 섹터 추가
-각 도시의 실제 주력 산업을 반영한 주식 섹터 데이터 추가

2. computed를 활용한 투자 심리 추가
-특정 지역에 비가 오거나 기온이 20도 미만일 경우 시장 심리가 위축된다는 가정하에 로직 구현

3. watch를 활용한 리밸런싱 트리거
- 투자 심리 변경 시 watch를 통해 포토폴리오 변경 추천 

3.1 elints 넣기
- 

4. 도시에 영어 이름 추가
- return에 영어 이름이나 한글이름 없을 시 검색 안되게 함

4.1 트러플 슈팅
- 'seoul'로 검색 시 검색이 안 돼서 .tolowercase() 추가 및 리스트 영어 도시 명 소문자로 통일 ex) Seoul에서 seoul로 통일

### 나만의 커스텀 (과제 5번)
1.다크 모드 추가

### 최종 제출
-krx api 추가 