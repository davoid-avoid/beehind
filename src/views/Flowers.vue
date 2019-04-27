<template>
  <div id="flowers">
    <img src="../assets/flower-01.png">
    <br><br>
    This is the Flower Field View
    <br><br>
    <span class='buttonFlower' v-if="!showingFlowers" v-on:click="showFlowers">Click to Show All Flowers ( {{ flowers.length }} )</span>
    <span class='buttonFlower' v-if="showingFlowers" v-on:click="showFlowers">Click to Hide All Flowers ( {{ flowers.length }} )</span>
    <span v-if="showingFlowers">
      <div v-bind:key="flower.angle" v-for="flower in flowers">
        <br>{{ flower.type }}, {{ flower.distance }} units, {{ flower.angle }} degrees<br>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Flowers',
  components: {

  },
  props: {
    flowers: Array
  },
  data () {
    return {
      showingFlowers: false
    }
  },
  methods: {
    showFlowers: function () {
      this.showingFlowers = !this.showingFlowers
    }
  },
  created () {
    console.log(this.flowers)
  }
}
</script>

<style>
#flowers {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.buttonFlower {
  padding: 10px;
  background-color: black;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.buttonFlower:hover {
  background-color: #FDCF04;
  color: #533B14;
}
</style>
