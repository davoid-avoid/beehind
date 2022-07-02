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
import soundHandler from "./services/soundHandler.js";
export default {
  name: 'App',
  components: {
    Home, Game
  },
  data () {
    return {
      fader: 'fade'
    }
  },
  created () {
    soundHandler.createSound("./static/audio/game1.mp3", "game1", 1);
    soundHandler.createSound("./static/audio/incorrect1.mp3", "incorrect1", 0.4);
    soundHandler.createSound("./static/audio/incorrect2.mp3", "incorrect2", 0.4);
    soundHandler.createSound("./static/audio/correct1.mp3", "correct1", 0.7);
    soundHandler.createSound("./static/audio/correct2.mp3", "correct2", 0.7);
    soundHandler.createSound("./static/audio/correct3.mp3", "correct3", 0.7);
    soundHandler.createSound("./static/audio/maxhype.mp3", "maxhype", 1);
  },
  methods: {
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
  transition: top 1s;
  position: absolute;
  top: 0px;
}
.fade-leave-active {
  transition: top 1s;
  position: absolute;
  top: 0px;
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  top: 1000px;
}
.fade-leave-to {
  top: -1000px;
}

a {
  text-decoration: none;
}
</style>
