<template>
  <div id="game">
    <div class="game-wrapper">
      <h3>Bee on Beat</h3>
      <div class="content-wrapper">
        <div class="left-content">
          <Hive :flowerInfo="chosenFlower" :hype="hypeAmount" />
        </div>
        <div class="right-content">
          <Flowers
            :flowers="flowerLocations"
            :chosenFlower="chosenFlower"
            :hypeMax="hypeMax"
            :tutorialActive="tutorialActive"
          />
        </div>
      </div>
      <div class="game-footer">
        <div v-if="tutorialStep === 0">
          Welcome to B Boys; a game about reading bee dances.<br /><br />
          In this game, you will be asked to look at a bee dancing, and
          determine the flower the bee is communicating via the dance.<br /><br />
          <button class="button" @click="stepTutorial(1)">Next</button>
        </div>
        <div v-if="tutorialStep === 1">
          When bees communicate, they do a dance called the
          <a href="https://en.wikipedia.org/wiki/Waggle_dance" target="_blank"
            >'Waggle Dance'</a
          ><br /><br />
          The direction the bee dances in communicates the direction of the
          flower in question<br /><br />
          <button class="button" @click="stepTutorial(2)">Next</button>
        </div>
        <div v-if="tutorialStep === 2">
          To win the game, you must select the flower the bee is indicating by
          dancing.<br /><br />
          Try clicking the flower now
        </div>
        <div v-if="tutorialStep === 3">
          Great Job!<br /><br />
          Which flower is the bee indicating in this instance?
        </div>
        <div v-if="tutorialStep === 4">
          Awesome!<br /><br />
          Now, the distance the bee dances also determines the distance of the
          flower to the hive.<br /><br />
          <button class="button" @click="stepTutorial(5)">Next</button>
        </div>
        <div v-if="tutorialStep === 5">
          Which of the two flowers is the bee indicating?<br /><br />
          Click the flower now
        </div>
        <div v-if="tutorialStep === 6">
          How about out of these flowers?<br /><br />
        </div>
        <div v-if="tutorialStep === 7">
          That's really all there is to it!<br /><br />
          Try to choose as many correct flowers as possible in the time given.<br><br>
          Build up Hype by selecting correctly as fast as possible. At full hype, you will be given opportunity for big combos.<br><br>
          Good luck!!
        </div>
        <br /><br />
        <router-link to="/Menu" class="button">Back to Menu</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../services/event-bus.js";
import Hive from "./Hive";
import Flowers from "./Flowers";
import soundHandler from "../services/soundHandler.js";
export default {
  name: "Tutorial",
  components: {
    Hive,
    Flowers,
  },
  data() {
    return {
      flowerLocations: [],
      chosenFlower: {},
      flowerAmount: 1,
      maxRange: 5,
      minRange: 1,
      flowerTypes: ["lilac", "rose", "daisy", "tulip", "sunflower"],
      score: 0,
      hypeAmount: 0,
      hypeCounter: 0,
      hypeMax: false,
      combo: 0,
      highestCombo: 0,
      activeIndicator: "",
      gameStart: false,
      tutorialStep: 0,
      tutorialActive: true
    };
  },
  created() {
    EventBus.$on("resetGame", (reset) => {
      if (this.tutorialStep === 6) {
        this.stepTutorial(7)
      } else if (this.tutorialStep === 5) {
        this.stepTutorial(6)
      } else if (this.tutorialStep === 3) {
        this.stepTutorial(4)
      } else if (this.tutorialStep === 2) {
        this.stepTutorial(3)
      }
    });
  },
  computed: {
    comboStyle() {
      if (this.combo >= 12) {
        return "font-weight: bold; color: green";
      }
      if (this.combo >= 9) {
        return "font-weight: bold; color: blue";
      }
      if (this.combo >= 6) {
        return "font-weight: bold; color: red";
      }
      if (this.combo >= 3) {
        return "font-weight: bold";
      }
    },
    timeLeftMinutes() {
      let minutes = Math.floor(this.timer / 60);
      let seconds = this.timer % 60;
      return `${minutes}:${this.padTo2Digits(seconds)}`;
    },
  },
  methods: {
    stepTutorial(step) {
      this.tutorialStep = step;

      if (step === 1) {
        this.flowerLocations = [
          { type: 'lilac', distance: 1, angle: 90, identifier: 0 }
        ]
        this.chosenFlower = this.flowerLocations[0]
        EventBus.$emit('tutorialCall')
      }
      if (step === 2) {
        this.tutorialActive = false
      }
      if (step === 3) {
        this.flowerLocations = [
          { type: 'lilac', distance: 1, angle: 0, identifier: 0 },
          { type: 'rose', distance: 1, angle: 90, identifier: 1 },
          { type: 'tulip', distance: 1, angle: 180, identifier: 2 },
          { type: 'sunflower', distance: 1, angle: 270, identifier: 3 }
        ]
        this.chosenFlower = {}
        this.chosenFlower = this.flowerLocations[3]
        EventBus.$emit('tutorialCall')
      }
      if (step === 4) {
        this.tutorialActive = true
        this.flowerLocations = [
          { type: 'daisy', distance: 1, angle: 90, identifier: 0 },
          { type: 'lilac', distance: 4, angle: 90, identifier: 1 }
        ]
        this.chosenFlower = {}
        this.chosenFlower = this.flowerLocations[1]
        console.log(this.chosenFlower)
        EventBus.$emit('tutorialCall')
      }
      if (step === 5) {
        this.tutorialActive = false
      }
      if (step === 6) {
        this.flowerLocations = [
          { type: 'lilac', distance: 1, angle: 0, identifier: 0 },
          { type: 'rose', distance: 2, angle: 45, identifier: 1 },
          { type: 'tulip', distance: 2, angle: 110, identifier: 2 },
          { type: 'sunflower', distance: 3, angle: 270, identifier: 3 },
          { type: 'rose', distance: 3, angle: 310, identifier: 4 },
          { type: 'daisy', distance: 3, angle: 10, identifier: 5 },
          { type: 'tulip', distance: 4, angle: 45, identifier: 6 },
          { type: 'lilac', distance: 4, angle: 110, identifier: 7 },
          { type: 'rose', distance: 1, angle: 270, identifier: 8 },
          { type: 'lilac', distance: 2, angle: 310, identifier: 9 },
        ]
        this.chosenFlower = {}
        this.chosenFlower = this.flowerLocations[Math.floor(Math.random() * this.flowerLocations.length)]
      }
      if (step === 7) {
        this.flowerLocations = []
        this.chosenFlower = {}
        EventBus.$emit('tutorialCall')
      }
    }
  },
  mounted() {
    soundHandler.fadeOutSound("menus");
    soundHandler.fadeInSound("gameover");
  },
  beforeDestroy() {
    EventBus.$off("resetGame");
    EventBus.$off("incorrect");
    EventBus.$off("soundEnd");
    soundHandler.fadeOutSound("gameover");
  },
};
</script>

<style>
#game {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.game-wrapper {
  width: 820px;
  margin: 0 auto;
}
.content-wrapper {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  position: relative;
}
.left-content,
.right-content {
  width: 50%;
  position: relative;
}
.game-footer {
  width: 100%;
  padding-bottom: 30px;
}

.hype-meter {
  width: 50%;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 30px;
  height: 7px;
  background-color: rgb(44, 44, 44);
  border-radius: 3px;
}

.hype-fill {
  height: 7px;
  background-color: #2fda4b;
  border-radius: 3px;
  float: left;
  transition: all 0.2s;
}

.hype-max {
  background-color: #00a2ff;
}

.button {
  padding: 10px;
  background-color: black;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 5px;
}

.button:hover {
  background-color: #fdcf04;
  color: #533b14;
}

.pre-start,
.end-game {
  width: 100%;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.2s;
  pointer-events: none;
}

.pre-start-visible,
.end-game-visible {
  background-color: rgba(0, 0, 0, 0.6);
  pointer-events: initial !important;
}

.pre-start-text {
  width: 100%;
  top: 180px;
  position: relative;
  margin: 0 auto;
  color: white;
  animation: upfade 1s 1;
  font-size: 30pt;
  font-weight: bold;
}

.end-game-text {
  width: 100%;
  top: 140px;
  position: relative;
  margin: 0 auto;
  color: white;
  font-size: 30pt;
  font-weight: bold;
}

@keyframes upfade {
  0% {
    opacity: 1;
    top: 180px;
  }
  40% {
    opacity: 1;
    top: 180px;
  }
  100% {
    opacity: 0;
    top: 140px;
  }
}

@media screen and (max-width: 820px) {
  .game-wrapper {
    width: 100vw;
    justify-content: center;
    overflow-x: hidden;
  }
  .content-wrapper {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
  }
  .left-content,
  .right-content {
    display: flex;
    width: 100%;
    position: relative;
    float: left;
    justify-content: center;
    margin-bottom: 20px;
  }
  .pre-start,
  .end-game {
    width: 100%;
    height: 820px;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.2s;
    pointer-events: none;
  }
}
</style>
