<template>
  <div id="game">
    <div class='game-wrapper'>
      <div class='left-content'>
        <Hive :flowerInfo="chosenFlower"/>
      </div>
      <div class='right-content'>
        <Flowers :flowers="flowerLocations"/>
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
      flowerAmount: Number,
      chosenFlower: {},
      flowerMin: 8,
      flowerMax: 11,
      maxRange: 4,
      minRange: 1,
      flowerTypes: ['lilac', 'rose', 'daisy', 'tulip']
    }
  },
  created () {
    this.flowerAmount = Math.floor(Math.random() * (this.flowerMax - this.flowerMin)) + this.flowerMin
    this.flowerLocations = this.generateFlowers(this.flowerAmount)
    this.chosenFlower = this.chooseFlower()
  },
  methods: {
    generateFlowers: function (amount) {
      let array = []
      let averageRotation = 360 / amount
      console.log(averageRotation)
      let heldRotation = 0
      for (let i = 0; i < amount; i++) {
        let flower = {}

        flower.distance = Math.floor(Math.random() * (this.maxRange - this.minRange)) + this.minRange

        let angleCalc = (Math.floor(Math.random() * averageRotation) + 20)
        flower.angle = angleCalc + heldRotation
        heldRotation += angleCalc

        flower.type = this.flowerTypes[Math.floor(Math.random() * (this.flowerTypes.length))]

        flower.identifier = i

        array.push(flower)
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
