<template>
  <div id='flowers'>
    <!--<img src="../assets/flower-01.png">-->
    <div id='flower-field'>
      <div class='beehive'>
        <div id='flower-origin'>
          <div v-bind:key="flower.identifier" v-for="flower in flowers">
            <div class='flower-holder' v-bind:style="{height: (flower.distance * 60) + 'px', transform: 'rotate(' + flower.angle + 'deg)'}">
              <div class='flower' v-bind:style="{transform: 'rotate(-' + flower.angle + 'deg)'}" v-bind:class="[flower.type]"></div>
            </div>
          </div>
        </div>
      <div class='beehive-visible'></div>
    </div>
    </div>
    <br><br>
    This is the Flower Field View
    <br><br>
    <span class='buttonFlower' v-if="!showingFlowers" v-on:click="showFlowers">Click to Show All Flowers ( {{ flowers.length }} )</span>
    <span class='buttonFlower' v-if="showingFlowers" v-on:click="showFlowers">Click to Hide All Flowers ( {{ flowers.length }} )</span>
    <span v-if="showingFlowers">
      <div v-bind:key="flower.angle" v-for="flower in flowers">
        <br>id: {{ flower.identifier }}, {{ flower.type }}, {{ flower.distance }} units, {{ flower.angle }} degrees<br>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Flowers',
  components: {},
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
  background-color: #fdcf04;
  color: #533b14;
}

.beehive {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  position: relative;
  top: calc(50% - 20px);
}

#flower-field {
  width: 400px;
  height: 400px;
  position: relative;
  margin: 0 auto;
  background-color: green;
}

#flower-origin {
  left: 50%;
  top: 50%;
  position: relative;
}

.flower-holder {
  width: 1px;
  margin: 0 auto;
  position: absolute;
  transform-origin: bottom center;
  bottom: 0;
  background-color: black;
}

.flower {
  width: 20px;
  height: 20px;
  position: relative;
  top: 0;
  left: -10px;
}

.lilac {
    background-color: lavender;
}

.daisy {
  background-color: yellow;
}

.tulip {
  background-color: purple
}

.rose {
  background-color: red;
}

.beehive-visible {
  width: 100%;
  height: 100%;
  background-color: orange;
  position: absolute;
}
</style>
