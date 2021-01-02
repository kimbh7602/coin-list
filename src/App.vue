<template>
  <v-app>
      <main-view />
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    MainView: () => import('@/components/Main'),
  },

  data: () => ({
    //
  }),
};
</script>
<style>
@import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);
div {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
}

ul {
    list-style: none;
}

div.wrapper {
  width: 1000px;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 30px;
  font-family: 'Nanum Gothic', serif;
}

.leftAlign {
  text-align: left;
}

.rightAlign {
  text-align: right;
}

.boldText {
  font-weight: bold;
}
</style>
