<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Navbar v-if="showNavbar"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/shared-components/Navbar.vue'
import Client from '@/client'
export default {
  name: 'App',
  components: {
    Navbar
  },
  data: () => ({
    showNavbar: false
  }),
  async mounted () {
    let client = new Client()
    let validation = await client.validateToken()
    console.log(validation)
    if (!validation.token) this.showNavbar = false
    else this.showNavbar = true
  },
  async beforeUpdate () {
    let client = new Client()
    let validation = await client.validateToken()
    console.log(validation)
    if (!validation.token) this.showNavbar = false
    else this.showNavbar = true
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
