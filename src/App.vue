<template>
  <div id="app">

    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">Huskalkyl.se</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li>
              <router-link to="/buy">Köpa bostad</router-link>
            </li>
            <li>
              <router-link to="/sell">Sälja bostad</router-link>
            </li>
            <li>
              <router-link to="/interest">Ränteberäkning</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
