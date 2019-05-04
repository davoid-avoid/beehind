<template>
  <div id="game">
    <div class='game-wrapper'>
      <div class='left-content'>
        <Hive :flowerInfo="chosenFlower"/>
      </div>
      <div class='right-content'>
        <Flowers :flowers="flowerLocations" :chosenFlower="chosenFlower"/>
      </div>
    </div>
  </div>
</template>

<script>
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
      flowerAmount: 100,
      maxRange: 5,
      minRange: 1,
      flowerTypes: ['lilac', 'rose', 'daisy', 'tulip']
    }
  },
  created () {
    this.flowerLocations = this.generateFlowers(this.flowerAmount)
    this.chosenFlower = this.chooseFlower()
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

        let angleCalc = Math.floor((Math.floor(Math.random() * (30 + averageRotation)) + 30) / (circles + 1))

        flower.angle = (angleCalc + heldRotation) - (360 * circles)
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
  margin-top: 60px;
}
.game-wrapper {
  width: 100%;
}
.left-content, .right-content {
  width: 50%;
  position: relative;
  float: left;
}
</style>
