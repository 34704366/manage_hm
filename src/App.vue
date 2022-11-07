<template>
  <div id="app">
    <!-- 路由的内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;
}
</style>
