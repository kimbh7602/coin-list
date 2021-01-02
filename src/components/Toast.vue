<template>
  <transition name="fade" >
    <div v-if="toastObj.isToastOpen" class="toast" :style="{left: toastObj.xPosition, top: toastObj.yPosition}">
        {{toastObj.message}}
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import {toastClose} from '../store/type'
export default {
    computed: {
        ...mapState(['toastObj'])
    },

    mounted() {
        this.$store.commit(toastClose)
    },
}
</script>

<style>
.toast {
    display: flex;
    width: 200px;
    height: 50px;
    font-size: 13px;
    font-weight: bold;
    background-color: #99ccff;
    border-radius: 5px;
    position: absolute;
    align-items: center;
    justify-content: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>