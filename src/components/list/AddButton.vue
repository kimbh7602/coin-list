<template>
  <button class="add-btn"
    @click="handleClickAddBtn"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#a6a6a6">
      <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
    </svg>
    더보기
  </button>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
export default {
    computed: {
        ...mapState(['currency', 'per_page', 'page']),
    },

    methods: {
        ...mapActions(['addCoinList']),
        ...mapMutations(['setLoading', 'setLoaded', 'addPage']),

        handleClickAddBtn() {
          this.setLoading();
          this.addPage();

          const param = {
            currency: this.currency,
            per_page: this.per_page,
            page: this.page
          };

          this.addCoinList(param);
          this.setLoaded();
        }
    }
}
</script>

<style>
svg {
    margin-right: 10px;
}

.add-btn {
  width: 100%;
  height: 50px;
  font-size:0.8em;
}
</style>