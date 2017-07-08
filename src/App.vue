<style src="./assets/main.less" lang="less"></style>
<template>
  <div id="app">

    <Navbar />

    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './Components/Navbar';
export default {
  components: {Navbar},
  name: 'app'
};
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
