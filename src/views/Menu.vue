<template>
  <div id="menu">
    <h1>Choose mode!</h1>
    <br><br>
    <button class='button' v-on:click="startGame1">GAME 1 - CHOOSE THE FLOWER</button>
  </div>
</template>


<script>
export default {
  name: 'Menu',
  components: {
  },
  props: {
  },
  methods: {
    startGame1: function () {
      this.$router.push('Game1')
    }
  }
}
</script>

<style>
#menu {
  justify-content: center;
  text-align: center;
  width: 820px;
}

@media screen and (max-width: 820px) {
  #home {
    justify-content: center;
    text-align: center;
    width: 100vw;
  }
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

.bee-logo-wrapper {
  position: relative;
  width: 261px;
  height: 300px;
  margin: 0 auto;
}
.bee-logo {
  animation: updown 4s infinite;
  position: absolute;
  top: 0px;
  left: 0px;
}

@keyframes updown {
  0% { top: 0px }
  50% { top: 40px }
  100% { top: 0px }
}
</style>