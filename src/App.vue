<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app{
    margin: 0;
    padding: 0;
  }
  html,body,#app{
    height: 100vh;
  }

</style>
