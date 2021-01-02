<template>
  <div class="loading-div">
      <object type="image/svg+xml" data="/spinner.svg"></object>
      <h1>Now Loading</h1>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.loading-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
</style>