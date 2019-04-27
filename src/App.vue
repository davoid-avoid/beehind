<template>
  <div id="app">

    <transition
    name="fade"
    v-on:after-leave="leave"
    >
      <Home v-if="started == false" :started="started"/>
    </transition>

    <transition name="fade">
      <Game v-if="startedGame"/>
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
  margin-top: 60px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
