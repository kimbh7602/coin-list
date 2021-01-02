<template>
    <ul class="contents">
        <div class="star">
            <svg
                @click="handleClickStar"
                class="star-svg"
                fill="currentColor"
                preserveAspectRatio="xMidYMid meet"
                height="1em"
                width="1em"
                viewBox="0 0 32 32"
                style='verticalAlign: "middle"'
            >
                <g fill="none" fillRule="evenodd">
                
                <path v-if="coinInfo.isMarked"
                    fill="#FFDA00"
                    d="M16.055 0c.872 0 1.688.57 2.254 1.731l3.403 6.975a.598.598 0 0 0 .233.171l7.606 1.118c2.531.373 3.26 2.639 1.428 4.448l-5.504 5.428a.622.622 0 0 0-.089.277l1.3 7.666c.432 2.55-1.474 3.953-3.74 2.748l-6.802-3.62a.616.616 0 0 0-.288 0l-6.803 3.62c-2.264 1.204-4.17-.195-3.739-2.748l1.3-7.666a.63.63 0 0 0-.089-.277l-5.504-5.428C-.81 12.636-.084 10.368 2.45 9.995l7.606-1.118a.598.598 0 0 0 .233-.171L13.69 1.73C14.255.571 15.183 0 16.055 0"
                />
                <path v-else
                    fill="#D5D5D5"
                    d="M16.055 0c.872 0 1.688.57 2.254 1.731l3.403 6.975a.598.598 0 0 0 .233.171l7.606 1.118c2.531.373 3.26 2.639 1.428 4.448l-5.504 5.428a.622.622 0 0 0-.089.277l1.3 7.666c.432 2.55-1.474 3.953-3.74 2.748l-6.802-3.62a.616.616 0 0 0-.288 0l-6.803 3.62c-2.264 1.204-4.17-.195-3.739-2.748l1.3-7.666a.63.63 0 0 0-.089-.277l-5.504-5.428C-.81 12.636-.084 10.368 2.45 9.995l7.606-1.118a.598.598 0 0 0 .233-.171L13.69 1.73C14.255.571 15.183 0 16.055 0"
                />    
                </g>
            </svg>
        </div>
        <li class="name">
            <span class="name-span" @click="goCoinDetail">{{coinInfo.name}}</span>
        </li>
        <li class="symbol">
            {{symbol}}
        </li>
        <li class="price">
            {{currency === 'krw' ? '₩' : '$'}}{{currentPrice}}
        </li>

        <li v-if="percent1h>0" class="hour red-text">
            {{percent1h}}%
        </li>
        <li v-else class="hour blue-text">
            {{percent1h}}%
        </li>

        <li v-if="percent24h>0" class="day red-text">
            {{percent24h}}%
        </li>
        <li v-else class="day blue-text">
            {{percent24h}}%
        </li>

        <li v-if="percent7d>0" class="week red-text">
            {{percent7d}}%
        </li>
        <li v-else class="week blue-text">
            {{percent7d}}%
        </li>

        <li class="volume">
            {{currency === 'krw' ? '₩' : '$'}}{{totalVolume}}
        </li>
    </ul>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import {upperCase, toString, replace} from 'lodash'

const DIGIT_REG_PATTERN = /\B(?=(\d{3})+(?!\d))/g // 세자리 마다 쉼표를 넣는 정규식
const COMMA = "," // 세자리 마다 쉼표를 넣기 위해
export default {
    props: ['coinInfo', 'currency'],

    computed: {
        ...mapState(['isToastOpen']),

        symbol: function() {
            return upperCase(this.coinInfo?.symbol);
        },

        currentPrice: function() {
            return replace(toString(this.coinInfo?.current_price), DIGIT_REG_PATTERN, COMMA);
        },

        percent1h: function() {
            const percent1h = this.coinInfo?.price_change_percentage_1h_in_currency;
            return percent1h !== null
                ? percent1h.toFixed(2)
                : 0;
        },
        
        percent24h: function() {
            const percent24h = this.coinInfo?.price_change_percentage_24h_in_currency;
            return percent24h !== null
                ? percent24h.toFixed(2)
                : 0;
        },
        
        percent7d: function() {
            const percent7d = this.coinInfo?.price_change_percentage_7d_in_currency;
            return percent7d !== null
                ? percent7d.toFixed(2)
                : 0;
        },

        totalVolume: function() {
            return replace(toString(this.coinInfo?.total_volume), DIGIT_REG_PATTERN, COMMA);
        },
    },

    methods: {
        ...mapMutations(['addBookmark', 'removeBookmark', 'toastOpen']),

        handleClickStar(evt) {
            if(this.coinInfo.isMarked) {
                this.coinInfo.isMarked = !this.coinInfo.isMarked;
                this.removeBookmark(this.coinInfo);
                // toast 컴포넌트 호출
                const param = {
                    isToastOpen: true,
                    xPosition: `${(evt.clientX-10)}px`,
                    yPosition: `${evt.clientY+20}px`,
                    message: '북마크가 해제되었습니다.',
                }
                this.toastOpen(param);
            }else {
                this.coinInfo.isMarked = !this.coinInfo.isMarked;
                this.addBookmark(this.coinInfo);
                // toast 컴포넌트 호출
                const param = {
                    isToastOpen: true,
                    xPosition: `${(evt.clientX-10)}px`,
                    yPosition: `${evt.clientY+20}px`,
                    message: '북마크가 설정되었습니다.',
                }
                this.toastOpen(param);
            }
        },

        goCoinDetail() {
            this.$router.push(`/coindetail/${this.coinInfo.id}`);
        }
    }

}
</script>

<style>
.contents {
    display: flex;
    align-items: center;
    padding-right: 30px;
    height: 40px;
    border-bottom: 1px solid #dcdcdc;
}

.star {
    width: 25px;
    margin-right: 10px;
    font-size: 17px;
}

.star-svg {
    cursor: pointer;
}

.name {
    width: 25%;
    font-size: 13px;
    font-weight: bold;
}

.name-span {
    cursor: pointer;
}

.symbol {
    width: 10%;
    font-size: 10px;
    font-weight: bold;
    color: gray;
}

.price {
    text-align: right;
    font-size: 12px;
    font-weight: bold;
    width: 15%;
}

.hour {
    text-align: right;
    font-size: 12px;
    font-weight: bold;
    width: 18%;
}

.day {
    text-align: right;
    font-size: 12px;
    font-weight: bold;
    width: 13%;
}

.week {
    text-align: right;
    font-size: 12px;
    font-weight: bold;
    width: 13%;
}

.red-text{
    color: red;
}

.blue-text{
    color: blue;
}

.volume {
    text-align: right;
    font-size: 12px;
    font-weight: bold;
    width: 25%;
}
</style>