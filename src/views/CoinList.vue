<template>
  <div class='wrapper' v-if="coinList.length > 0">
      <button-group />
      <selectbox-group />
      <table-header />
      <div v-if="page_type === 'normal'">
        <coin-list-item v-for="(coinInfo, i) in coinList" :key="i"
            :coin-info="coinInfo"
            :currency="currency"
        />
        <add-button/>
      </div>
      <div v-else>
        <template v-if="bookmarkList.length>0">
            <coin-list-item v-for="(coinInfo, i) in bookmarkList" :key="i"
                :coin-info="coinInfo"
                :currency="currency"
            />
        </template>
        <template v-else>
            <div class="space2" />
            <h1 class="empty-bookmark">북마크된 자산이 없습니다</h1>
        </template>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import CoinListItem from '../components/list/CoinListItem'
import TableHeader from '../components/list/TableHeader'
import SelectboxGroup from '../components/list/SelectboxGroup'
import ButtonGroup from '../components/list/ButtonGroup'
import AddButton from '../components/list/AddButton'
export default {
    components: {
        CoinListItem,
        TableHeader,
        SelectboxGroup,
        ButtonGroup,
        AddButton
    },

    computed: {
        ...mapState(['coinList', 'bookmarkList', 'currency', 'per_page', 'page', 'page_type']),
    },

    methods: {
        ...mapActions(['fetchCoinList', 'addCoinList']),
        ...mapMutations(['setPageType', 'setParam', 'setLoaded'])
    },

    created() {
        this.setPageType('normal');
        const param = {
            currency: 'krw',
            per_page: 10,
            page: 1,
        }
        this.setParam(param);
        this.fetchCoinList(param);
        this.setLoaded();
    },

    mounted() {
        
    }
}
</script>

<style>

</style>