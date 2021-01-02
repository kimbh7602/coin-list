<template>
  <div class="detail-header-row">
    <div class="star">
        <svg
            @click="handleClickStar"
            class="star-svg"
            fill="currentColor"
            preserveAspectRatio="xMidYMid meet"
            height="1.2em"
            width="1.2em"
            viewBox="0 0 32 32"
            style='verticalAlign: "middle"'
        >
            <g fill="none" fillRule="evenodd">
                
            <path v-if="isMarked"
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
    <div class="thumb">
        <img :src="thumb"/>
    </div>
    <div class="detail-name">
        {{name}} ({{symbol}})
    </div>
    <div class="detail-select-div">
        <v-select
            @change="changeDetailCurrency"
            item-value="value"
            item-text="text"
            v-model="default_currency"
            :items="currencyItems"
            style="font-size:0.8em;"
            ></v-select>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import {upperCase} from 'lodash'
export default {
    data: () => ({
        default_currency: {
          value: 'krw',
          text: 'KRW 보기'
        },
        currencyItems: [{value:'krw', text:'KRW 보기'}, {value:'usd', text:'USD 보기'}],

        isMarked: false,
        thumb: '',
        name: '',
        symbol: '',
    }),

    computed: {
      ...mapState(['coinDetail'])
    },

    methods: {
      ...mapActions(['fetchCoinDetail']),
      ...mapMutations(['setLoading', 'setLoaded', 'addBookmark', 'removeBookmark', 'setDetailCurrency', 'toastOpen']),

      handleClickStar(evt) {
        if(this.coinDetail.isMarked) {
          this.isMarked = !this.isMarked;
          this.coinDetail.isMarked = !this.coinDetail.isMarked;
          this.removeBookmark(this.coinDetail);
          // toast 컴포넌트 호출
          const param = {
            isToastOpen: true,
            xPosition: `${(evt.clientX-10)}px`,
            yPosition: `${evt.clientY+20}px`,
            message: '북마크가 해제되었습니다.',
          }
          this.toastOpen(param);
        }else {
          this.isMarked = !this.isMarked;
          this.coinDetail.isMarked = !this.coinDetail.isMarked;
          this.addBookmark(this.coinDetail);
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

      changeDetailCurrency(value) {
        this.setLoading();
        this.setDetailCurrency(value);
        this.setLoaded();
      },
    },

    watch: {
      coinDetail: function(detailData) {
        this.isMarked = detailData?.isMarked;
        this.thumb = detailData?.image?.thumb;
        this.name = detailData?.localization?.ko ? detailData?.localization?.ko : detailData?.localization?.en;
        this.symbol = upperCase(detailData?.symbol);
      }
    }
}
</script>

<style>
.detail-header-row {
    display: flex;
    align-items: center;
}

.thumb {
    width: 4%;
}

.detail-name {
    width: 40%;
    font-size: 25px;
    font-weight: bold;
}

.detail-select-div {
    width: 15%;
    margin-left: auto;
}
</style>