<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <transition>
    <div class="loading active-loading" v-if="!ready">
      LOADING<br /><br />
      <div class="loading-bar-backing">
        <div
          class="loading-bar-inner"
          :style="'width: ' + (loaded / sounds.length) * 100 + '%'"
        ></div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import Home from "./views/Home";
import Game from "./views/Game";
import soundHandler from "./services/soundHandler.js";
import { EventBus } from "./services/event-bus.js";
export default {
  name: "App",
  components: {
    Home,
    Game,
  },
  data() {
    return {
      fader: "fade",
      loaded: 0,
      ready: false,
      sounds: [
        {
          path: "./static/audio/game1.mp3",
          name: "game1",
          volume: 1,
          loop: false,
        },
        {
          path: "./static/audio/menus.mp3",
          name: "menus",
          volume: 0.6,
          loop: true,
        },
        {
          path: "./static/audio/gameover.mp3",
          name: "gameover",
          volume: 0.6,
          loop: true,
        },
        {
          path: "./static/audio/incorrect1.mp3",
          name: "incorrect1",
          volume: 0.7,
          loop: false,
        },
        {
          path: "./static/audio/incorrect2.mp3",
          name: "incorrect2",
          volume: 0.7,
          loop: false,
        },
        {
          path: "./static/audio/correct1.mp3",
          name: "correct1",
          volume: 0.7,
          loop: false,
        },
        {
          path: "./static/audio/correct2.mp3",
          name: "correct2",
          volume: 0.7,
          loop: false,
        },
        {
          path: "./static/audio/correct3.mp3",
          name: "correct3",
          volume: 0.7,
          loop: false,
        },
        {
          path: "./static/audio/maxhype.mp3",
          name: "maxhype",
          volume: 1,
          loop: false,
        },
      ],
    };
  },
  created() {
    this.sounds.forEach((sound) => {
      soundHandler.createSound(
        sound.path,
        sound.name,
        sound.volume,
        sound.loop
      );
    });
    if (this.$router.currentRoute.path !== "/") {
      this.$router.push("/");
    }
    EventBus.$on("soundLoaded", this.checkLoaded);
  },
  methods: {
    checkLoaded() {
      console.log("sound loaded");
      this.loaded++;
      if (this.loaded === this.sounds.length) {
        this.ready = true;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
  transition: top 1.2s;
  position: absolute;
  top: 0px;
}
.fade-leave-active {
  transition: top 1.2s;
  position: absolute;
  top: 0px;
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  top: 200vh;
}
.fade-leave-to {
  top: -200vh;
}

a {
  text-decoration: none;
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  padding-top: 40px;
  font-weight: bold;
  font-size: 30pt;
}

.loading-bar-backing {
  width: 400px;
  margin: 0 auto;
  height: 8px;
  background-color: black;
  border-radius: 4px;
}

.loading-bar-inner {
  height: 8px;
  left: 0;
  top: 0;
  background-color: rgb(78, 163, 78);
  border-radius: 4px;
}

v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
