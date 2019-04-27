<template>
  <div id="flowers">
    <img src="../assets/flower-01.png">
    <br><br>
    This is the Flower Field View
  </div>
</template>

<script>
import { EventBus } from './../services/event-bus.js'
export default {
  name: 'Flowers',
  components: {

  },
  props: {

  },
  methods: {

  }
}
</script>

<style>
#flowers {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
