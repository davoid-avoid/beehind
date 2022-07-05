<template>
  <div id="game">
    <div class="game-wrapper">
      <div v-if="!gameStart">
        <h3>Interpretive Breakdance</h3>
      </div>
      <div v-if="gameStart">
        <h3>{{ timeLeftMinutes }}</h3>
      </div>
      <div class="content-wrapper">
        <div class="left-content">
          <Hive :flowerInfo="chosenFlower" :hype="hypeAmount" :hints="hints" />
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
        <div :class="['pre-start', preStart ? 'pre-start-visible' : '']">
          <div class="pre-start-text" v-if="preStartText !== ''">
            {{ preStartText }}
          </div>
        </div>
        <div :class="['end-game', gameOver ? 'end-game-visible' : '']">
          <div class="end-game-text" v-if="gameOver">
            SCORE: {{ score }}<br /><br />
            MAX COMBO: {{ highestCombo }}
          </div>
        </div>
      </div>
      <div class="game-footer">
        <div v-if="!gameStart && !preStart">
          <button class="button" @click="preStartGame">READY?</button
          ><br /><br />
          Click the flower the bee is indicating via dance<br /><br />
        </div>
        <div v-if="gameStart && !gameOver">
          SCORE: {{ score }}<br /><br />
          COMBO: <span :style="comboStyle">{{ combo }}</span> <br /><br />
          <span v-if="!hypeMax">Hype meter</span>
          <span v-if="hypeMax" style="font-weight: bold">MAX HYPE!</span>
          <br />
          <div class="hype-meter">
            <div
              class="hype-fill"
              :style="'width: ' + (hypeAmount / 200) * 100 + '%'"
              :class="hypeMax ? 'hype-max' : ''"
            ></div>
          </div>
          <div :style="score > 0 ? '' : 'opacity: 0.2'">
            Hints
            <div class="hints-holder">
              <div
                :class="[
                  hints.arrow ? 'disabled-hint' : '',
                  'arrow-hint-button',
                  'hint-button',
                ]"
                @click="hintCall('arrow')"
              >
                <img src="../assets/arrowHintButton.png" />
              </div>
              <div
                :class="[
                  hints.circle ? 'disabled-hint' : '',
                  'circle-hint-button',
                  'hint-button',
                ]"
                @click="hintCall('circle')"
              >
                <img src="../assets/circleHintButton.png" />
              </div>
              <div
                :class="[
                  hints.flower ? 'disabled-hint' : '',
                  'flower-hint-button',
                  'hint-button',
                ]"
                @click="hintCall('flower')"
              >
                <img src="../assets/flowerHintButton.png" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <br />
          <button class="button" @click="$router.push('/Menu')">Quit</button>
        </div>
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
  name: "Game",
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
      timer: 185,
      timerHolder: 0,
      preStart: false,
      preStartText: "",
      preStartCountdown: 0,
      gameOver: false,
      tutorialActive: false,
      hints: {
        arrow: false,
        circle: false,
        flower: false,
      },
    };
  },
  created() {
    EventBus.$on("resetGame", (reset) => {
      this.hints.arrow = false;
      this.hints.circle = false;
      this.hints.flower = false;
      this.score++;
      if (!this.hypeMax) {
        this.flowerAmount += 2;
        if (this.flowerAmount > 60) {
          this.flowerAmount = 60;
        }
      }
      this.combo++;
      if (this.combo > this.highestCombo) {
        this.highestCombo = this.combo;
      }
      this.hypeAmount += 20;
      if (this.hypeAmount > 200) {
        this.hypeAmount = 200;
        if (!this.hypeMax) {
          soundHandler.playSound("maxhype");
          this.hypeMax = true;
          let self = this;
          setTimeout(() => {
            self.hypeMax = false;
            self.hypeAmount = 50;
          }, 10000);
        }
      }
      this.flowerLocations = [];
      this.flowerLocations = this.generateFlowers(this.flowerAmount);
      this.chosenFlower = this.chooseFlower();
      this.activeIndicator = "";
      this.activeIndicator = "correct";
      let rand = Math.floor(Math.random() * 3) + 1;
      soundHandler.playSound("correct" + rand);
    });

    EventBus.$on("incorrect", (reset) => {
      this.hypeAmount -= 30;
      if (this.hypeAmount < 0) {
        this.hypeAmount = 0;
      }
      this.combo = 0;
      this.flowerAmount -= 5;
      if (this.flowerAmount < 1) {
        this.flowerAmount = 1;
      }
      this.activeIndicator = "";
      this.activeIndicator = "incorrect";
      let rand = Math.floor(Math.random() * 2) + 1;
      soundHandler.playSound("incorrect" + rand);
    });
    EventBus.$on("soundEnd", (sound) => {
      if (sound === "game1") {
        soundHandler.fadeInSound("gameover");
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
    generateFlowers: function (amount) {
      let array = [];
      let averageRotation = 360 / amount;
      let heldRotation = 0;
      for (let i = 0; i < amount; i++) {
        let flower = {};
        let circles = 0;
        if (heldRotation !== 0) {
          circles = Math.floor(heldRotation / 360);
        }
        let angleCalc = Math.floor(
          (Math.floor(Math.random() * (averageRotation * 10)) + 40) /
            (circles + 1)
        );
        let angle = angleCalc + heldRotation - 360 * circles;
        if (angle > 360) {
          circles++;
          angle = angleCalc + heldRotation - 360 * circles;
        }
        flower.angle = angle;
        heldRotation += angleCalc;
        flower.type =
          this.flowerTypes[Math.floor(Math.random() * this.flowerTypes.length)];
        flower.identifier = i;
        flower.distance = this.minRange * (circles + 1);
        if (flower.distance < this.maxRange) {
          array.push(flower);
        }
      }
      return array;
    },
    chooseFlower: function () {
      let chosenFlowerNumber = Math.floor(
        Math.random() * (this.flowerLocations.length - 1)
      );
      let chosenFlower = this.flowerLocations[chosenFlowerNumber];
      return chosenFlower;
    },
    decreaseHype(self) {
      if (self.hypeAmount > 0) {
        self.hypeAmount -= 2;
      }
    },
    padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    },
    preStartGame() {
      soundHandler.playSound("game1");
      this.preStart = true;
      this.preStartGameTwo();
    },
    preStartGameTwo() {
      this.preStartText = "";
      this.preStartCountdown++;
      let self = this;
      setTimeout(() => {
        if (self.preStartCountdown === 4) {
          self.preStartText = "Go!";
        } else {
          self.preStartText = self.preStartCountdown;
        }
        setTimeout(() => {
          if (self.preStartCountdown < 4) {
            self.preStartGameTwo();
          } else {
            self.preStartText = "";
            self.startGame();
          }
        }, 1000);
      }, 1);
    },
    startGame() {
      this.preStart = false;
      this.flowerLocations = this.generateFlowers(this.flowerAmount);
      this.chosenFlower = this.chooseFlower();
      this.gameStart = true;
      EventBus.$emit("startGame");
      let self = this;
      this.timerHolder = setInterval(() => {
        self.timer--;
        if (self.timer === 0) {
          self.endGame();
        }
      }, 1000);
    },
    endGame() {
      clearInterval(this.timerHolder);
      this.gameOver = true;
    },
    hintCall(type) {
      if (this.score > 0) {
        if (!this.hints[type]) {
          this.hints[type] = true;
          this.score--;
          if (this.score < 0) {
            this.score = 0;
          }
        }
      }
    },
  },
  mounted() {
    soundHandler.fadeOutSound("menus");
    let self = this;
    this.hypeCounter = setInterval(() => {
      if (!self.hypeMax) {
        self.decreaseHype(self);
      }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.hypeCounter);
    clearInterval(this.timerHolder);
    EventBus.$off("resetGame");
    EventBus.$off("incorrect");
    EventBus.$off("soundEnd");
    soundHandler.fadeOutSound("game1");
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
  margin-bottom: 30px;
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
  cursor: pointer;
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
