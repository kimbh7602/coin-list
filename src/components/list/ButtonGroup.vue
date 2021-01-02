<template>
  <div v-if="$router.currentRoute.path === '/coinlist'" class="btn-group">
      <button class="active-btn">가상자산 시세 목록</button>
      <button @click="goToBookmarkList" class="inactive-btn">북마크 목록</button>
  </div>
  <div v-else class="btn-group">
      <button @click="goToCoinList" class="inactive-btn">가상자산 시세 목록</button>
      <button class="active-btn">북마크 목록</button>
  </div>
</template>

<script>
export default {
    methods: {
        goToBookmarkList() {
            this.$router.push(`/bookmarklist`);
        },

        goToCoinList() {
            this.$router.push(`/coinlist`);
        }
    },
}
</script>

<style>
.active-btn {
    width:50%;
    height: 60px;
    padding:0.5em;
    border-radius: 3px;
    border: none;
    font-size: 25px;
    background-color: white;
    box-shadow: 2px 2px 2px 2px gray;
    position: relative;
    z-index: 1;
    font-weight: bold;
    cursor: default;
}

.inactive-btn {
    width:50%;
    height: 60px;
    padding:0.5em;
    border-radius: 3px;
    border: none;
    font-size: 25px;
    position: relative;
    z-index: 0;
    cursor: pointer;
    background-color: #EAEAEA;
}
</style>