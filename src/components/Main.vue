<template>
    <div>
        <loading v-show="isLoading" />
        <router-view></router-view>
        <toast v-if="toastObj.isToastOpen" />
    </div>
</template>

<script>
import Loading from './Loading'
import Toast from './Toast'
import { mapState } from 'vuex'
export default {
  components: { 
      Loading,
      Toast 
  },

  computed: {
      ... mapState(['isLoading', 'toastObj'])
  },
}
</script>

<style>

</style>