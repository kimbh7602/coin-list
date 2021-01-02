# coin-list

## 작업 기간

> 2020.12.26 ~ 2021.01.02



## 사용 기술 스택

> JavaScript
>
> Vue.js
>
> Axios
>
> Vuetify



## 프로젝트 실행

```
npm install
npm run serve
```



## 프로젝트 설명

[CoinGecko API (V3)](https://www.coingecko.com/api/documentations/v3#/)의 API를 활용하여 가상 화폐의 목록 및 정보를 제공하는 프로젝트입니다.



### 프로젝트 구조

```bash
project/
├─ node_modules/
├─ public/
├─ src/
│	├─ api/
│	├─ components/
│	├─ plugins/
│	├─ router/
│	├─ store/
│	│	├─ index.js
│	│	└─ type.js
│	├─ views/
│	├─ App.vue
│	└─ main.js
├─ babel.config.js
├─ package.json
└─ vue.config.js
```

#### `/api`

CoinGecko API를 통해 데이터를 받아오는 Axios 기능들을 모아둔 디렉토리입니다.

#### `/components`

화면을 구성하는데 필요한 컴포넌트들을 분할해 모아둔 디렉토리입니다.

공통적으로 필요한 컴포넌트의 경우 `/components` 폴더 내에 위치합니다.
가상 자산 목록 화면에 필요한 컴포넌트의 경우 하위 폴더인 `/list` 폴더 내에 위치합니다.
가상 자산 정보 화면에 필요한 컴포넌트는 하위 폴더인 `/detail` 폴더 내에 위치합니다.

#### `/plugins`

Vuetify 라이브러리 plugin을 사용하기 위한 디렉토리입니다.

#### `/router`

vue-router를 통해 라우터 설정을 위한 디렉토리입니다.

#### `/store`

vuex를 통해 상태관리를 하기 위한 디렉토리입니다.

state 관리 및 동기 처리를 위한 mutations, 비동기 처리를 위한 actions 를 위한 `index.js` 파일과 동기 처리를 컴포넌트 내에서 처리하기 위해 commit 시에 필요한 문자열을 상수화 시키기 위한 `type.js` 파일이 위치합니다.

#### `/views`

실제 라우터 이동을 위한 화면을 모아둔 디렉토리입니다.



### 사용 라이브러리

> vue-router, vuex, axios를 제외하고 사용한 라이브러리에 대한 정리입니다.

#### Vuetify

기존 기본 셀렉트 박스 이외에 vuetify 라이브러리 내의 <v-select>를 이용해 좀 더 스타일리쉬한 셀렉트 박스를 이용하기 위해 사용하였습니다.

#### lodash

lodash 라이브러리에서 제공하는 다양한 메소드를 이용해 데이터를 용이하게 처리하며 동시에 코드의 길이를 줄이고 가독성을 높여 읽기 쉬운 코드를 작성하기 위해 사용하였습니다.



## 구현 화면

> 모든 화면은 flex CSS를 기반으로 구현되었으며 vue-router를 통해 페이지를 이동하며 url path가 `/`인 경우 자동으로 `/coinlist`로 리다이렉트 합니다.



### 라우터 URL

> 가상 자산 목록 `/coinlist`
>
> 북마크 자산 목록 `/bookmarklist`
>
> 가상 자산 정보 `/coindetail/:id`
> 	-> ex) `/coindetail/bitcoin`



### 가상 자산 목록

> - CoinGecko API를 통해 받아온 데이터를 통해 가상 자산의 목록을 보여줍니다.
> - 가장 위 두 버튼으로 전체 목록, 북마크 목록을 볼 수 있습니다.
> - 첫 번째 셀렉트 박스를 통해서도 전체보기, 북마크 보기를 바꿀 수 있습니다.
> - 두 번째 셀렉트 박스를 통해 currency 기준을 KRW, USD로 바꿀 수 있습니다. 이는 더보기 버튼을 눌러 로드되어 있는 만큼의 목록 전체를 바꿔줍니다.
> - 세 번째 셀렉트 박스를 통해 한 번에 로드하는 가상 자산의 갯수를 10개, 30개, 50개로 바꿀 수 있습니다. 
> - 더보기 버튼을 통해 현재 설정되어 있는 로드하는 자산의 갯수만큼 목록을 더 불러옵니다.
> - 가장 좌측의 별을 클릭해 북마크를 설정 및 해제 가능하며 북마크된 경우 채워진 별, 해제된 경우 빈 별로 표기됩니다. 별을 클릭 시에 해당 좌표를 기준으로 하단에 Toast 알림이 떠오르며 이는 Vue.js의 transition을 이용해 fade 효과를 가진 component로 만들어져 있습니다.
> - 가상 자산의 이름을 클릭 시 가상 자산 정보 페이지로 이동합니다.

![list](C:\Users\KBH\Pictures\list.PNG)

### 북마크 목록

> - 위의 가상 자산 목록 화면의 구현 내용과 거의 흡사하며 해당 화면에서 셀렉트 박스 및 더보기 버튼이 빠진 화면입니다.
> - 좌측의 채워진 별을 클릭 시에 목록에서 해당 자산이 사라지며 클릭된 좌표를 기준으로 하단에 Toast 알림이 떠오르며 이는 Vue.js의 transition을 이용해 fade 효과를 가진 component로 만들어져 있습니다.

![bookmarklist](C:\Users\KBH\Pictures\bookmarklist.PNG)

### 가상 자산 정보

> - 좌측 상단의 별을 클릭해 북마크를 설정 및 해제 가능하며 북마크된 경우 채워진 별, 해제된 경우 빈 별로 표기됩니다. 별을 클릭 시에 해당 좌표를 기준으로 하단에 Toast 알림이 떠오르며 이는 Vue.js의 transition을 이용해 fade 효과를 가진 component로 만들어져 있습니다.
>
> - 우측 상단의 셀렉트 박스를 통해 currency를 KRW, USD로 변경이 가능하며 변경 시에 화면에 표기된 모든 금액 표시 및 가격 계산의 통화또한 변경됩니다.
>
> - 해당 자산과 현재 선택된 currency의 화폐 사이의 가격이 계산 가능합니다
>
>   좌측 자산 가격 입력 시에 숫자와 마침표 하나만 입력이 가능하며 소수점은 8자리까지만 가능합니다.
>
>   우측 화폐 가격 입력 시에 숫자만 입력이 가능하며 currency가 KRW인 경우 0으로 시작할 수 없습니다.
>
>   각 입력창의 해당 조건을 만족하지 않는 경우 타이핑 및 붙여넣기 해도 입력되지 않습니다.
>
> - 설명의 경우 설명보기 버튼을 클릭하면 표시되며 기본 한글, 한글이 없을 경우 영어로 표시됩니다. 둘 다 없을 경우 설명보기 영역이 표시되지 않습니다.

![detail](C:\Users\KBH\Pictures\detail.PNG)