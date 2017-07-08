<template>
  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" v-on:click="navbar.toggle()">
          <span class="sr-only">Visa meny</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Huskalkyl.se</a>
      </div>
      <div class="collapse navbar-collapse" v-bind:class="{ 'show': navbar.collapsed }">
        <ul class="nav navbar-nav">
          <router-link tag="li" to="/buy"><a>Köpa bostad</a></router-link>
          <router-link tag="li" to="/sell"><a>Sälja bostad</a></router-link>
          <router-link tag="li" to="/interest"><a>Ränteberäkning</a></router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import NavbarStore from '../NavbarStore';

export default {
  name: 'navbar',
  data () {
    return {
      navbar: NavbarStore
    };
  }
};
</script>
