<template>
  <div class="select-box-group">
    <div class="right-align">
      <div class="select-box-div">
        <v-select
          @change="changePageType"
          item-value="value"
          item-text="text"
          v-model="default_page_type"
          :items="pageTypeItems"
          style="font-size:0.8em;"
          ></v-select>
      </div>
      <div class="select-box-div">
        <v-select
          @change="changeCurrency"
          item-value="value"
          item-text="text"
          v-model="default_currency"
          :items="currencyItems"
          style="font-size:0.8em;"
          ></v-select>
      </div>
      <div class="select-box-div">
        <v-select
          @change="changePerPage"
          item-value="value"
          item-text="text"
          v-model="default_per_page"
          :items="perPageItems"
          style="font-size:0.8em;"
          ></v-select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
    data: () => ({
        default_page_type: {
          value: 'normal',
          text: '전체보기'
        },
        default_currency: {
          value: 'krw',
          text: 'KRW 보기'
        },
        default_per_page: {
          value: 10,
          text: '10개 보기'
        },
        pageTypeItems: [{value:'normal', text:'전체보기'}, {value:'bookmarked', text:'북마크보기'}],
        currencyItems: [{value:'krw', text:'KRW 보기'}, {value:'usd', text:'USD 보기'}],
        perPageItems: [{value:10, text:'10개 보기'}, {value:30, text:'30개 보기'}, {value:50, text:'50개 보기'}],  
    }),

    computed: {
      ...mapState(['currency', 'per_page', 'page_type', 'page'])
    },

    methods: {
      ...mapActions(['fetchCoinList', 'fetchBookmarkList']),
      ...mapMutations(['setLoading', 'setLoaded', 'setPage', 'setPerPage', 'setCurrency', 'setPageType']),
      
      changePageType(value) {
        this.setLoading();
        this.setPageType(value);
        if(value === 'bookmarked'){
          const param = {
            currency: this.currency
          }
          this.fetchBookmarkList(param);
        }else {
          this.setPage();
          const param = {
            currency: this.currency,
            per_page: this.per_page,
            page: this.page
          }
          this.fetchCoinList(param);
        }
        this.setLoaded();
      },

      changeCurrency(value) {
        this.setLoading();
        this.setCurrency(value);
        if(this.page_type === 'bookmarked'){
          const param = {
            currency: this.currency
          }
          this.fetchBookmarkList(param);
        }else {
          const param = {
            currency: this.currency,
            per_page: this.per_page*this.page,
            page: 1
          }
          this.fetchCoinList(param);
        }
        this.setLoaded();
      },

      changePerPage(value) {
        this.setLoading();
        this.setPerPage(value);
        if(this.page_type === 'normal'){
          this.setPage();
          const param = {
            currency: this.currency,
            per_page: this.per_page,
            page: this.page
          }
          this.fetchCoinList(param);
        }
        this.setLoaded();
      }
    }
}
</script>

<style>
.select-box-group {
  display: flex;
}

.right-align {
  width:43%;
  margin-left: auto;
  display: flex;
}

.select-box-div {
  width: 27%;
  margin: 0 auto;
}
</style>