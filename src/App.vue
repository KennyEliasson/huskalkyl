<template>
  <div id="app">

    <Navbar />

    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
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
<style src="./assets/main.less" lang="less"></style>
