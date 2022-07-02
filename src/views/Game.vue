<template>
  <div id="game">
    <div class="game-wrapper">
      <h3>Click the flower the bee is indicating via dance</h3>
      <div class="content-wrapper">
        <div class="left-content">
          <Hive
            :flowerInfo="chosenFlower"
            :hype="hypeAmount"
          />
        </div>
        <div class="right-content">
          <Flowers :flowers="flowerLocations" :chosenFlower="chosenFlower" />
        </div>
      </div>
      <div class="game-footer">
        Hype!<br>
        <div class="hype-meter">
          <div class="hype-fill" :style="'width: ' + (hypeAmount / 200 * 100) + '%'" :class="hypeMax ? 'hype-max' : ''"></div>  
        </div>
        <router-link to="/Menu">Back to Menu</router-link>
        <br /><br />
        <a href="https://en.wikipedia.org/wiki/Waggle_dance" target="_blank"
          >Info on waggle dance</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "./../services/event-bus.js";
import Hive from "./Hive";
import Flowers from "./Flowers";
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
      hypeAmount: 0,
      hypeCounter: 0,
      hypeMax: false
    };
  },
  created() {
    this.flowerLocations = this.generateFlowers(this.flowerAmount);
    this.chosenFlower = this.chooseFlower();

    EventBus.$on("resetGame", (reset) => {
      this.flowerAmount += 3;
      this.hypeAmount += 20;
      if (this.hypeAmount > 200) {
        this.hypeAmount = 200
        this.hypeMax = true
        let self = this
        setTimeout(() => {
          self.hypeMax = false
          self.hypeAmount = 50
        }, 10000)
      }
      this.flowerLocations = [];
      this.flowerLocations = this.generateFlowers(this.flowerAmount);
      this.chosenFlower = this.chooseFlower();
    });
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
  },
  mounted() {
    let self = this;
    this.hypeCounter = setInterval(() => {
      if (!self.hypeMax) {
        self.decreaseHype(self)
      }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.hypeCounter)
  }
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
}
.left-content,
.right-content {
  width: 50%;
  position: relative;
}
.game-footer {
  width: 100%;
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
  background-color: #ff0800
}

@media screen and (max-width: 820px) {
  .game-wrapper {
    width: 100vw;
    justify-content: center;
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
}
</style>
