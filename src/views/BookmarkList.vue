<template>
  <div class='wrapper' v-if="bookmarkList.length > 0">
      <button-group />
      <div class="space" />
      <table-header />
      <coin-list-item v-for="(coinInfo, i) in bookmarkList" :key="i"
        :coin-info="coinInfo"
        :currency="currency"
      />
  </div>
  <div class="wrapper" v-else>
      <button-group />
      <div class="space" />
      <table-header />
      <div class="space2" />
      <h1 class="empty-bookmark">북마크된 자산이 없습니다</h1>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import CoinListItem from '../components/list/CoinListItem'
import TableHeader from '../components/list/TableHeader'
import ButtonGroup from '../components/list/ButtonGroup'
export default {
    components: {
        CoinListItem,
        TableHeader,
        ButtonGroup,
    },
    
    computed: {
        ...mapState(['bookmarkList', 'currency']),
    },

    methods: {
        ...mapActions(['fetchBookmarkList']),
        ...mapMutations(['setLoaded'])
    },

    created() {
        const param = {
            currency: this.currency,
        }
        this.fetchBookmarkList(param);
        this.setLoaded();
    },
}
</script>

<style>
.space {
    height: 70px;
}

.space2 {
    height: 30px;
}

.empty-bookmark {
    text-align: center;
}
</style>