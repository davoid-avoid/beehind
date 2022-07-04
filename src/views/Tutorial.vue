<template>
  <div id="game">
    <div class="game-wrapper">
      <h3>Bee on Beat</h3>
      <div class="content-wrapper">
        <div class="left-content">
          <Hive :flowerInfo="chosenFlower" :hype="hypeAmount" :hints="hints" />
          <div class="waggle-diagram" v-if="tutorialStep === 2">
            <img src="../assets/waggle.png" />
          </div>
        </div>
        <div class="right-content">
          <Flowers
            :flowers="flowerLocations"
            :chosenFlower="chosenFlower"
            :hypeMax="hypeMax"
            :tutorialActive="tutorialActive"
            :hints="hints"
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
          The dance the bee is doing communicates direction and distance of the
          flower.<br /><br />
          <button class="button" @click="stepTutorial(2)">Next</button>
        </div>
        <div v-if="tutorialStep === 2">
          The 'waggle' portion of the dance (indicated in red) is what indicates
          direction.<br /><br />
          <button class="button" @click="stepTutorial(3)">Next</button>
        </div>
        <div v-if="tutorialStep === 3">
          To win the game, you must select the flower the bee is indicating by
          dancing.<br /><br />
          <strong>Try clicking the flower now</strong>
        </div>
        <div v-if="tutorialStep === 4">
          Great Job!<br /><br />
          Which flower is the bee indicating in this instance?<br /><br />
          <strong>Try clicking the flower now</strong>
        </div>
        <div v-if="tutorialStep === 5">
          Awesome!<br /><br />
          Now, the distance the bee dances also determines the distance of the
          flower to the hive.<br /><br />
          <button class="button" @click="stepTutorial(6)">Next</button>
        </div>
        <div v-if="tutorialStep === 6">
          Which of the two flowers is the bee indicating?<br /><br />
          <strong>Try clicking the flower now</strong>
        </div>
        <div v-if="tutorialStep === 7">
          How about out of these flowers?<br /><br />
          <strong>Try clicking the flower now</strong>
        </div>
        <div v-if="tutorialStep === 8">
          Great job!<br /><br />
          You also have the ability to get help via hints:<br /><br />
          <button class="button" @click="stepTutorial(9)">Next</button>
        </div>
        <div v-if="tutorialStep === 9">
          There are three types of hints: Direction<br /><br />
          <button class="button" @click="stepTutorial(10)">Next</button>
        </div>
        <div v-if="tutorialStep === 10">
          Distance<br /><br />
          <button class="button" @click="stepTutorial(11)">Next</button>
        </div>
        <div v-if="tutorialStep === 11">
          And Flower Type<br /><br />
          <button class="button" @click="stepTutorial(12)">Next</button>
        </div>
        <div v-if="tutorialStep === 12">
          Each Hint will cost 1 from your Score to use<br /><br />
          <button class="button" @click="stepTutorial(13)">Next</button>
        </div>
        <div v-if="tutorialStep === 13">
          That's really all there is to it!<br /><br />
          Try to choose as many correct flowers as possible in the time
          given.<br /><br />
          Build up Hype by selecting correctly as fast as possible. At full
          hype, you will be given opportunity for big combos.<br /><br />
          Good luck!!
        </div>
        <div
          class="hints-holder"
          v-if="
            tutorialStep === 8 ||
            tutorialStep === 9 ||
            tutorialStep === 10 ||
            tutorialStep === 11 ||
            tutorialStep === 12
          "
        >
          <div
            :class="[
              !hints.arrow || score === 0 ? 'disabled-hint' : '',
              'arrow-hint-button',
              'hint-button',
            ]"
          >
            <img src="../assets/arrowHintButton.png" />
          </div>
          <div
            :class="[
              !hints.circle || score === 0 ? 'disabled-hint' : '',
              'circle-hint-button',
              'hint-button',
            ]"
          >
            <img src="../assets/circleHintButton.png" />
          </div>
          <div
            :class="[
              !hints.flower || score === 0 ? 'disabled-hint' : '',
              'flower-hint-button',
              'hint-button',
            ]"
          >
            <img src="../assets/flowerHintButton.png" />
          </div>
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
      tutorialActive: true,
      hintsLeft: 3,
      hints: {
        arrow: false,
        circle: false,
        flower: false,
      },
    };
  },
  created() {
    EventBus.$on("resetGame", (reset) => {
      if (this.tutorialStep === 7) {
        this.stepTutorial(8);
      } else if (this.tutorialStep === 6) {
        this.stepTutorial(7);
      } else if (this.tutorialStep === 4) {
        this.stepTutorial(5);
      } else if (this.tutorialStep === 3) {
        this.stepTutorial(4);
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
          { type: "lilac", distance: 1, angle: 90, identifier: 0 },
        ];
        this.chosenFlower = this.flowerLocations[0];
        EventBus.$emit("tutorialCall");
      }
      if (step === 3) {
        this.tutorialActive = false;
      }
      if (step === 4) {
        this.flowerLocations = [
          { type: "lilac", distance: 1, angle: 0, identifier: 0 },
          { type: "rose", distance: 1, angle: 90, identifier: 1 },
          { type: "tulip", distance: 1, angle: 180, identifier: 2 },
          { type: "sunflower", distance: 1, angle: 270, identifier: 3 },
        ];
        this.chosenFlower = {};
        this.chosenFlower = this.flowerLocations[3];
        EventBus.$emit("tutorialCall");
      }
      if (step === 5) {
        this.tutorialActive = true;
        this.flowerLocations = [
          { type: "daisy", distance: 1, angle: 90, identifier: 0 },
          { type: "lilac", distance: 4, angle: 90, identifier: 1 },
        ];
        this.chosenFlower = {};
        this.chosenFlower = this.flowerLocations[1];
        console.log(this.chosenFlower);
        EventBus.$emit("tutorialCall");
      }
      if (step === 6) {
        this.tutorialActive = false;
      }
      if (step === 7) {
        this.flowerLocations = [
          { type: "lilac", distance: 1, angle: 0, identifier: 0 },
          { type: "rose", distance: 2, angle: 45, identifier: 1 },
          { type: "tulip", distance: 2, angle: 110, identifier: 2 },
          { type: "sunflower", distance: 3, angle: 270, identifier: 3 },
          { type: "rose", distance: 3, angle: 310, identifier: 4 },
          { type: "daisy", distance: 3, angle: 10, identifier: 5 },
          { type: "tulip", distance: 4, angle: 45, identifier: 6 },
          { type: "lilac", distance: 4, angle: 110, identifier: 7 },
          { type: "rose", distance: 1, angle: 270, identifier: 8 },
          { type: "lilac", distance: 2, angle: 310, identifier: 9 },
        ];
        this.chosenFlower = {};
        this.chosenFlower = this.flowerLocations[Math.floor(Math.random() * this.flowerLocations.length)];
      }
      if (step === 8) {
        this.tutorialActive = true;
        this.flowerLocations = [
          { type: "lilac", distance: 1, angle: 0, identifier: 0 },
          { type: "rose", distance: 2, angle: 45, identifier: 1 },
          { type: "tulip", distance: 2, angle: 110, identifier: 2 },
          { type: "sunflower", distance: 3, angle: 270, identifier: 3 },
          { type: "rose", distance: 3, angle: 310, identifier: 4 },
          { type: "daisy", distance: 3, angle: 10, identifier: 5 },
          { type: "tulip", distance: 4, angle: 45, identifier: 6 },
          { type: "lilac", distance: 4, angle: 110, identifier: 7 },
          { type: "rose", distance: 1, angle: 270, identifier: 8 },
          { type: "lilac", distance: 2, angle: 310, identifier: 9 },
        ];
        this.chosenFlower = {};
        this.chosenFlower = this.flowerLocations[Math.floor(Math.random() * this.flowerLocations.length)];
        EventBus.$emit("tutorialCall");
      }
      if (step === 9) {
        this.score = 1;
        this.hints.arrow = true;
      }
      if (step === 10) {
        this.hints.arrow = false;
        this.hints.circle = true;
      }
      if (step === 11) {
        this.hints.circle = false;
        this.hints.flower = true;
      }
      if (step === 12) {
        this.hints.arrow = true;
        this.hints.circle = true;
        this.hints.flower = true;
      }
      if (step === 13) {
        this.hints.arrow = false;
        this.hints.circle = false;
        this.hints.flower = false;
      }
    },
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

.waggle-diagram {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.hints-holder {
  width: 200px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.hint-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.disabled-hint {
  opacity: 0.3;
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
