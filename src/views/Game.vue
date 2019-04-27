<template>
  <div id="game">
    <div class='game-wrapper'>
      <div class='left-content'>
        <Hive/>
      </div>
      <div class='right-content'>
        <Flowers/>
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
      flowerAmount: Number,
      chosenFlower: {},
      flowerMin: 8,
      flowerMax: 1500,
      maxRange: 30,
      minRange: 10,
      flowerTypes: ["lilac", "rose", "daisy", "tulip"]
    }
  },
  created () {
    this.flowerAmount = Math.floor(Math.random() * (this.flowerMax - this.flowerMin)) + this.flowerMin
    this.flowerLocations = this.generateFlowers(this.flowerAmount)
    this.chosenFlower = this.chooseFlower()

    console.log(this.flowerLocations)
    console.log(this.chosenFlower)
  },
  methods: {
    generateFlowers: function (amount) {
      let array = []
      for (let i = 0; i < amount; i++){
        let flower = {};
        flower.distance = Math.floor(Math.random() * (this.maxRange - this.minRange)) + this.minRange
        flower.angle = Math.floor(Math.random() * 359)
        flower.type = this.flowerTypes[Math.floor(Math.random() * (this.flowerTypes.length))]
        array.push(flower)
        console.log(flower)
      }
      return array;
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
