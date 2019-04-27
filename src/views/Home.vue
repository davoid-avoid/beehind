<template>
  <div id="home">
    <img src="../assets/bee-test2.png">
    <br><br>
    <span class='button' v-on:click="startGame">START WAGGLING</span>
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

.button {
  padding: 10px;
  background-color: black;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.button:hover {
  background-color: #FDCF04;
  color: #533B14;
}
</style>
