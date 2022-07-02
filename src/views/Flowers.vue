<template>
  <div id='flowers'>
    <!--<img src="../assets/flower-01.png">-->
    <div id='flower-field'>
      <div class='beehive'>
        <div id='flower-origin'>
          <div v-bind:key="flower.identifier" v-for="flower in flowers">
            <div class='flower-holder' v-bind:style="{height: (flower.distance * 48) + 'px', transform: 'rotate(' + flower.angle + 'deg)'}">
              <div class='flower' v-if="ifHypeMax(flower.identifier)" v-bind:style="{transform: 'rotate(-' + flower.angle + 'deg)'}" v-bind:class="[flower.type]" v-on:click="checkFlower(flower.identifier)"></div>
            </div>
          </div>
        </div>
      <div class='beehive-visible'></div>
    </div>
    </div>
    <!-- <br><br>
    This is the Flower Field View
    <br><br>
    <span class='buttonFlower' v-if="!showingFlowers" v-on:click="showFlowers">Click to Show All Flowers ( {{ flowers.length }} )</span>
    <span class='buttonFlower' v-if="showingFlowers" v-on:click="showFlowers">Click to Hide All Flowers ( {{ flowers.length }} )</span>
    <span v-if="showingFlowers">
      <div v-bind:key="flower.angle" v-for="flower in flowers">
        <br>id: {{ flower.identifier }}, {{ flower.type }}, {{ flower.distance }} units, {{ flower.angle }} degrees<br>
      </div>
    </span> -->
  </div>
</template>

<script>
import { EventBus } from './../services/event-bus.js'
export default {
  name: 'Flowers',
  components: {},
  props: {
    flowers: Array,
    chosenFlower: Object,
    hypeMax: Boolean
  },
  data () {
    return {
      showingFlowers: false
    }
  },
  methods: {
    showFlowers: function () {
      this.showingFlowers = !this.showingFlowers
    },
    checkFlower: function (identifier) {
      if (this.chosenFlower.identifier === identifier) {
        // alert('correct flower chosen')
        EventBus.$emit('resetGame', 'reset')
      } else {
        // alert('incorrect flower chosen')
        EventBus.$emit('incorrect', 'reset')
      }
    },
    ifHypeMax(identifier){
      if (this.hypeMax === false) {
        return true
      } else {
        if (this.chosenFlower.identifier === identifier) {
          return true
        } else {
          return false
        }
      }
    }
  },
  created () {

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
  width: 30px;
  height: 30px;
  margin: 0 auto;
  position: relative;
  top: calc(50% - 15px);
}

#flower-field {
  width: 400px;
  height: 400px;
  position: relative;
  margin: 0 auto;
  background-image: url('../assets/ground.png');
  background-repeat: repeat;
}

#flower-origin {
  left: 50%;
  top: 50%;
  position: relative;
}

.flower-holder {
  width: 0px;
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
  cursor: pointer;
}

.lilac {
  background-image: url("../assets/lilac.png");
}

.daisy {
  background-image: url("../assets/daisy.png");
}

.tulip {
  background-image: url("../assets/tulip.png");
}

.rose {
  background-image: url("../assets/rose.png");
}

.sunflower {
  background-image: url("../assets/sunflower.png");
}

.lilac:hover {
  background-image: url("../assets/lilachover.png");
}

.daisy:hover {
  background-image: url("../assets/daisyhover.png");
}

.tulip:hover {
  background-image: url("../assets/tuliphover.png");
}

.rose:hover {
  background-image: url("../assets/rosehover.png");
}

.sunflower:hover {
  background-image: url("../assets/sunflowerhover.png");
}

.beehive-visible {
  width: 100%;
  height: 100%;
  background-image: url("../assets/hive.png");
  position: absolute;
}
</style>
