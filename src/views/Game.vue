<template>
  <div id="game">
    <div class='game-wrapper'>
      <h3>Click the flower the bee is indicating via dance</h3>
      <div class='content-wrapper'>
        <div class='left-content'>
          <Hive :flowerInfo="chosenFlower"/>
        </div>
        <div class='right-content'>
          <Flowers :flowers="flowerLocations" :chosenFlower="chosenFlower"/>
        </div>
      </div>
      <div class="game-footer">
        <a href="https://en.wikipedia.org/wiki/Waggle_dance" target="_blank">Info on waggle dance</a>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from './../services/event-bus.js'
import Hive from './Hive'
import Flowers from './Flowers'
export default {
  name: 'Game',
  components: {
    Hive, Flowers
  },
  data () {
    return {
      flowerLocations: [],
      chosenFlower: {},
      flowerAmount: 1,
      maxRange: 5,
      minRange: 1,
      flowerTypes: ['lilac', 'rose', 'daisy', 'tulip', 'sunflower']
    }
  },
  created () {
    this.flowerLocations = this.generateFlowers(this.flowerAmount)
    this.chosenFlower = this.chooseFlower()

    EventBus.$on('resetGame', reset => {
      this.flowerAmount++
      this.flowerLocations = []
      this.flowerLocations = this.generateFlowers(this.flowerAmount)
      this.chosenFlower = this.chooseFlower()
    })
  },
  methods: {
    generateFlowers: function (amount) {
      let array = []
      let averageRotation = 360 / amount
      let heldRotation = 0
      for (let i = 0; i < amount; i++) {
        let flower = {}

        let circles = 0
        if (heldRotation !== 0) {
          circles = Math.floor(heldRotation / 360)
        }

        let angleCalc = Math.floor((Math.floor(Math.random() * (averageRotation * 10)) + 40) / (circles + 1))

        let angle = (angleCalc + heldRotation) - (360 * circles)

        if (angle > 360) {
          circles++
          angle = (angleCalc + heldRotation) - (360 * circles)
        }

        flower.angle = angle
        heldRotation += angleCalc

        flower.type = this.flowerTypes[Math.floor(Math.random() * (this.flowerTypes.length))]

        flower.identifier = i

        flower.distance = this.minRange * (circles + 1)

        if (flower.distance < this.maxRange) {
          array.push(flower)
        }
      }
      return array
    },
    chooseFlower: function () {
      let chosenFlowerNumber = Math.floor(Math.random() * (this.flowerLocations.length - 1))
      let chosenFlower = this.flowerLocations[chosenFlowerNumber]
      return chosenFlower
    }
  }
}
</script>

<style>
#game {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
.left-content, .right-content {
  width: 50%;
  position: relative;
}
.game-footer {
  width: 100%;
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
  .left-content, .right-content {
    display: flex;
    width: 100%;
    position: relative;
    float: left;
    justify-content: center;
    margin-bottom: 20px;
  }
}
</style>
