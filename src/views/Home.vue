<template>
  <div id="home">
    <img src="../assets/bee-test2.png">
    <br><br>
    <span v-on:click="startGame">START WAGGLING</span>
  </div>
</template>

<script>
import { EventBus } from './../services/event-bus.js'
export default {
  name: 'Home',
  components: {

  },
  props: {
    started: Boolean
  },
  methods: {
    startGame: function () {
      EventBus.$emit('startgame', this.started)
    }
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
