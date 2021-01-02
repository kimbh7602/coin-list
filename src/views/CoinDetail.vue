<template>
  <div class="wrapper">
      <detail-header />
      <div class="space2"></div>
      <detail-currency />
      <div class="space2"></div>
      <detail-exchange/>
      <div class="space2"></div>
      <description />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DetailCurrency from '../components/detail/DetailCurrency.vue';
import DetailExchange from '../components/detail/DetailExchange.vue';
import DetailHeader from '../components/detail/DetailHeader';
import Description from '../components/detail/Description';
export default {
    components: { 
      DetailHeader,
      DetailCurrency,
      DetailExchange,
      Description,
    },

    props:['id'],

    computed: {
      ...mapState(['coinDetail', 'detailCurrency'])
    },

    methods: {
      ...mapActions(['fetchCoinDetail']),
    },

    created() {
      const param = { id: this.id };
      this.fetchCoinDetail(param);
    },
}
</script>

<style>

</style>