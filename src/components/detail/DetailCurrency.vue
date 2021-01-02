<template>
  <div>
    <div class="currency-row">
        <div class="detail-table-header">
            <div>시가총액 Rank</div>
        </div>
        <div class="detail-table">
            <div>Rank #{{marketCapRank}}</div>
        </div>
        <div class="right-align">
            <div class="current-price-box">
                <div class="current-price">
                    {{detailCurrency === 'krw'
                    ? `₩${currentPrice}`
                    : `$${currentPrice}`
                    }}
                    <br />
                    <div class="current-price-btc">{{currentPriceBtc}} BTC</div>
                </div>
            </div>
            <div class="detail-percent-box">
                <div v-if="percentage24h>0" class="detail-percent red-text">
                    {{percentage24h}}%
                    <br />
                    <div v-if="percentage7d>0" class="detail-percent-7d red-text">
                        {{percentage7d}}%
                    </div>
                    <div v-else class="detail-percent-7d blue-text">
                        {{percentage7d}}%
                    </div>
                </div>
                <div v-else class="detail-percent blue-text">
                    {{percentage24h}}%
                    <br />
                    <div v-if="percentage7d>0" class="detail-percent-7d red-text">
                        {{percentage7d}}%
                    </div>
                    <div v-else class="detail-percent-7d blue-text">
                        {{percentage7d}}%
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="currency-row">
        <div class="detail-table-header">
            <div>웹사이트</div>
        </div>
        <div class="detail-table">
            <div>{{homepage}}</div>
        </div>
        <div class="market-cap-box">
            <div class="market-cap">
                시가총액
                <br />
                {{detailCurrency === 'krw'
                ? `₩${marketCap}`
                : `$${marketCap}`}}
            </div>
        </div>
        <div class="market-cap-box">
            <div class="market-cap">
                24시간 거래대금
                <br />
                {{detailCurrency === 'krw'
                ? `₩${totalVolume}`
                : `$${totalVolume}`}}
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {toString, replace} from 'lodash';

const KRW = 'krw'
const DIGIT_REG_PATTERN = /\B(?=(\d{3})+(?!\d))/g // 세자리 마다 쉼표를 넣는 정규식
const COMMA = "," // 세자리 마다 쉼표를 넣기 위해

export default {
    data: () => ({
        marketCapRank: 0,
        currentPrice: 0,
        currentPriceBtc: 0,
        percentage24h: 0.0,
        percentage7d: 0.0,
        homepage: '',
        marketCap: 0.0,
        totalVolume: 0.0,
    }),

    computed: {
        ...mapState(['coinDetail', 'detailCurrency'])
    },

    watch: {

        // coinDetail 객체가 바뀔 때 콜백 함수 실행 (현재는 렌더링이 된 후 객체에 값이 들어오는 상황)
        coinDetail: function (detailData) {
            // 자주 쓰이는 객체 변수 선언
            const marketData = detailData?.market_data;
            this.marketCapRank = detailData?.market_cap_rank;
            this.currentPrice = replace(toString(marketData?.current_price?.krw), DIGIT_REG_PATTERN, COMMA);
            this.currentPriceBtc = marketData?.current_price?.btc.toFixed(8);
            this.percentage24h = marketData?.price_change_percentage_24h.toFixed(1);
            this.percentage7d = marketData?.price_change_percentage_7d.toFixed(1);
            this.homepage = detailData?.links?.homepage[0];
            this.marketCap = replace(toString(marketData?.market_cap?.krw), DIGIT_REG_PATTERN, COMMA);
            this.totalVolume = replace(toString(marketData?.total_volume?.krw), DIGIT_REG_PATTERN, COMMA);
        },

        // detailCurrency 값이 바뀔 때 콜백 함수 실행
        // currency 에 따라 금액 변경
        detailCurrency: function (newCurrency) {
            // 자주 쓰이는 객체 변수 선언
            const marketData = this.coinDetail?.market_data;
            if(newCurrency === KRW) {
                this.currentPrice = replace(toString(marketData?.current_price?.krw), DIGIT_REG_PATTERN, COMMA);
                this.marketCap = replace(toString(marketData?.market_cap?.krw), DIGIT_REG_PATTERN, COMMA);
                this.totalVolume = replace(toString(marketData?.total_volume?.krw), DIGIT_REG_PATTERN, COMMA);
            } else {
                this.currentPrice = replace(toString(marketData?.current_price?.usd), DIGIT_REG_PATTERN, COMMA);
                this.marketCap = replace(toString(marketData?.market_cap?.usd), DIGIT_REG_PATTERN, COMMA);
                this.totalVolume = replace(toString(marketData?.total_volume?.usd), DIGIT_REG_PATTERN, COMMA);
            }
        }
    }
}
</script>

<style>
.currency-row {
    display: flex;
}

.detail-table-header {
    background-color: #f2f2f2;
    width: 17%;
    height: 70px;
    display: flex;
    align-items: center;
    padding: 20px;
    font-weight: bold;
    border: 1px solid #8c8c8c;
    border-right: none;
}

.detail-table {
    width: 33%;
    height:70px;
    display: flex;
    align-items: center;
    padding: 20px;
    border: 1px solid #8c8c8c;
    border-left: none;
}

.current-price-box {
    width: 80%;
    display: flex;
    align-items: flex-end;
}

.current-price {
    font-size: 25px;
    font-weight: bold;
    margin-top: auto;
    margin-left: auto;
    text-align: right;
}

.current-price-btc {
    font-size: 12px;
    color: #8c8c8c;
}

.detail-percent-box {
    width: 15%;
    display: flex;
    margin-left: auto;
    align-items: center;
}

.detail-percent {
    font-size: 15px;
    margin-top: auto;
}

.detail-percent-7d {
    font-size: 12px;
}

.market-cap-box {
    width: 24.5%;
    display: flex;
    align-items: flex-end;
    font-size: 13px;
    font-weight: bold;
}

.market-cap {
    margin-top: auto;
    margin-left: auto;
    text-align: right;
}
</style>