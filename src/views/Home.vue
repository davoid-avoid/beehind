<template>
  <div id="home">
    <h1>B BOYs</h1>
    <div class="bee-logo-wrapper">
      <img src="../assets/bee-title.svg" class="bee-logo" />
    </div>
    <br /><br />
    <button class="button" v-on:click="startGame">START WAGGLING</button>
  </div>
</template>

<script>
import soundHandler from "../services/soundHandler.js";
export default {
  name: "Home",
  data() {
    return {
    };
  },
  components: {},
  props: {},
  methods: {
    startGame: function () {
      this.$router.push("Menu");
    },
  },
  mounted() {
    soundHandler.fadeOutSound("menus");
  },
};
</script>

<style>
#home {
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
  background-color: #fdcf04;
  color: #533b14;
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
  0% {
    top: 0px;
  }
  50% {
    top: 40px;
  }
  100% {
    top: 0px;
  }
}
</style>
