<template>
  <div v-if="!isLoading" class="exchange-wrapper">
    <div class="boldText">가격 계산</div>
    <div class="exchange-box">
      <div class="exchange-header">{{ coinDetail.symbol.toUpperCase() }}</div>
      <div class="exchange-content"><input id="price" v-model="price" class="exchange-input" @keypress="isNumberKey"
                                           @keyup="changePrice" @paste="onPaste"/></div>
      <div class="arrow">
        <object class="arrow-svg" data="/arrow.svg" type="image/svg+xml"></object>
      </div>
      <div class="exchange-header">{{ detailCurrency === 'krw' ? 'KRW' : 'USD' }}</div>
      <div class="exchange-content"><input id="exchange" v-model="exchangePrice" class="exchange-input"
                                           @keypress="isNumberKey" @keyup="changeExchangePrice" @paste="onPaste"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import {head, includes, last as tail, replace, round, split, toString} from 'lodash'

const EXCHANGE_ID = 'exchange' // input tag id
const KRW = 'krw'
const DOT = "." // 소수점 구분을 위해
const COMMA = "," // 세자리 마다 쉼표를 넣기 위해
const EMPTY_STR = "" // 계산 시에 쉼표 빼기 위해
const DIGIT_REG_PATTERN = /\B(?=(\d{3})+(?!\d))/g // 세자리 마다 쉼표를 넣는 정규식
const COMMA_REG_PATTERN = /,/g // 전체 쉼표 정규식
export default {
  data: () => ({
    price: 1,
    exchangePrice: 0.0,
  }),

  computed: {
    ...mapState(['coinDetail', 'detailCurrency', 'isLoading']),
  },

  methods: {
    ...mapMutations(['setLoaded']),
    // 정수 부분은 세자리마다 쉼표를 넣어주고 소수점 8째 자리 이하는 잘라내는 함수
    convertPrice(price) {
      const FIRST_INDEX = 0
      const LAST_INDEX = 8
      const convertedPrice = replace(toString(price), COMMA_REG_PATTERN, EMPTY_STR)
      if (includes(convertedPrice, DOT)) {
        const first = replace(head(split(convertedPrice, DOT)), DIGIT_REG_PATTERN, COMMA);
        const last = tail(split(price, DOT))?.slice(FIRST_INDEX, LAST_INDEX);
        return `${first}.${last}`;
      } else {
        return replace(convertedPrice, DIGIT_REG_PATTERN, COMMA);
      }
    },
    // price 값이 변했을 때 실행되는 함수
    changePrice(evt) {
      const _value = evt?.target?.value;
      const POINT_EIGHT_REG_PATTERN = /^\d*[.]\d{8}$/; // 소수점 아래 8자리까지만 허용하는 정규식

      // 현재 value값이 소수점 여덟째자리 숫자이면 더이상 입력 불가
      if (POINT_EIGHT_REG_PATTERN.test(_value)) {
        evt.preventDefault();
      }

      const detailCurrency = this.coinDetail?.market_data?.current_price?.[this.detailCurrency];
      const exchangePrice = toString(round(replace(this.price, COMMA_REG_PATTERN, EMPTY_STR) * detailCurrency));
      this.exchangePrice = replace(exchangePrice, DIGIT_REG_PATTERN, COMMA);
      this.price = this.convertPrice(this.price)
    },

    changeExchangePrice() {
      const detailCurrency = this.coinDetail?.market_data?.current_price?.[this.detailCurrency];
      let exchangePrice = replace(this.exchangePrice, COMMA_REG_PATTERN, EMPTY_STR) / detailCurrency
      this.price = this.convertPrice(exchangePrice)
      this.exchangePrice = toString(replace(replace(this.exchangePrice, COMMA_REG_PATTERN, EMPTY_STR), DIGIT_REG_PATTERN, COMMA))
    },

    isNumberKey(evt) {
      const keyCode = evt?.keyCode
      const charCode = evt.which ? evt.which : keyCode;
      const targetId = evt?.target?.id;
      const _value = evt?.target?.value;
      const ZERO_ASCII = 48;
      const NINE_ASCII = 57;
      const POINT_ASCII = 46;
      const POINT_REG_PATTERN = /^\d*[.]\d*$/; // . 이 있는지 판별하는 정규식
      

      // currency . 입력 불가
      if (targetId === EXCHANGE_ID && charCode === POINT_ASCII) {
        event.preventDefault();
      }

      // currency가 krw일 때 0으로 시작하지 못하도록
      if (targetId === EXCHANGE_ID && this.detailCurrency === KRW) {
        if (keyCode === ZERO_ASCII && _value === '') {
          event.preventDefault();
        }
      }

      // 숫자와 . 만 입력 가능
      if (keyCode < ZERO_ASCII || keyCode > NINE_ASCII) {
        if (keyCode !== POINT_ASCII) {
          event.preventDefault();
        }
      }

      // 현재 value값에 소수점(.) 이 있으면 . 입력불가
      if (POINT_REG_PATTERN.test(_value)) {
        if (charCode == POINT_ASCII) {
          evt.preventDefault();
        }
      }
    },

    onPaste(evt) {
      const _value = evt.clipboardData.getData('text');
      const ZERO_START_REG_PATTERN = /(^0+)/; // 0으로 시작하는지 판별하는 정규식
      const DOT_START_REG_PATTERN = /(^\.+)/; // .으로 시작하는지 판별하는 정규식

      if (isNaN(_value)) {
        evt.preventDefault();
      }

      // .으로 시작하는 값을 붙여넣기 할 경우 입력 불가
      if (DOT_START_REG_PATTERN.test(_value)) {
        evt.preventDefault();
      }

      // currency가 krw이고 0으로 시작하는 값을 붙여넣기 할 경우 입력 불가
      if (evt.target.id === EXCHANGE_ID) {
        if (this.detailCurrency === KRW) {
          if (ZERO_START_REG_PATTERN.test(_value)) {
            evt.preventDefault();
          }
        }

        // 정수가 아닌 경우 입력 불가
        if (!Number.isInteger(_value)) {
          evt.preventDefault();
        }
      }
    },
  },
  watch: {
    // coinDetail 객체가 바뀔 때 콜백함수 실행 -> exchangePrice에 계산된 값 넣어주기
    // 객체 값을 받아오는 시점 문제 때문에 라이프 사이클 메소드 내에서 실행하지 못함 -> 사실 상 created에 실행할 내용
    coinDetail: function (detailData) {
      const exchangePriceStr = toString(this.price * detailData?.market_data?.current_price?.krw)
      this.exchangePrice = this.convertPrice(exchangePriceStr)
      this.setLoaded();
    },

    // detailCurrency가 바뀔 때 콜백함수 실행 -> 바뀐 currency의 가격으로 계산된 값 넣어주기
    detailCurrency: function (newCurrency) {
      const currentPrice = this.coinDetail?.market_data?.current_price;
      if(newCurrency === KRW) {
        const exchangePriceStr = toString(this.price * currentPrice?.krw);
        this.exchangePrice = this.convertPrice(exchangePriceStr);
      }else {
        const exchangePriceStr = toString(this.price * currentPrice?.usd);
        this.exchangePrice = this.convertPrice(exchangePriceStr);
      }
      this.setLoaded();
    }
  },

}
</script>

<style>
.exchange-wrapper {
  width: 100%;
  height: 180px;
  background-color: #d9d9d9;
  padding: 20px;
}

.exchange-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

.exchange-header {
  background-color: #f2f2f2;
  width: 15%;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  border: 2px solid #E5E5E5;
}

.exchange-content {
  background-color: white;
  width: 25%;
  height: 70px;
  display: flex;
  border: 2px solid #E5E5E5;
}

.exchange-input {
  text-align: right;
  align-items: center;
  justify-content: center;
  width: 90%;
}

.arrow {
  width: 8%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-svg {
  width: 60%;
  height: 60%;
}
</style>