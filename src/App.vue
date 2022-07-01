<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Home from './views/Home'
import Game from './views/Game'
import { EventBus } from './services/event-bus.js'
export default {
  name: 'App',
  components: {
    Home, Game
  },
  data () {
    return {
      started: false,
      startedGame: false,
      fader: 'fade'
    }
  },
  created () {
    EventBus.$on('startgame', started => {
      this.started = true
    })
  },
  methods: {
    leave: function (el, done) {
      this.startedGame = true
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
  max-width: 820px;
  margin: 0 auto;
  max-height: 900px;
  justify-content: center;
}

button {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border-radius: 5px;
  border: 0px;
}

body {
  margin: 0;
  max-height: 900px;
  overflow-y: hidden;
}

@media screen and (max-width: 820px) {
  body {
    overflow-y: auto;
    overflow-x: hidden;
  }
}

.fade-enter-active {
  transition: top 2s;
  position: absolute;
  top: 0px;
}
.fade-leave-active {
  transition: top 2s;
  position: absolute;
  top: 0px;
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  top: 1000px;
}
.fade-leave-to {
  top: -1000px;
}
</style>
