<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- 路由按钮，to属性传入路径 -->
    <router-link to="/">
      <el-button type="primary" plain round>按钮</el-button> 
    </router-link>
    <!-- 充当路由按钮，to属性传入路径 -->
    <router-link to="/user">
      <el-button type="success" plain>按钮</el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
