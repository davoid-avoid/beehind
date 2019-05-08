<template>
  <div id="hive">
    <div id="hive-interior">
      <div id="bee-container" v-bind:style="{transform: 'rotate(' + flowerInfo.angle + 'deg)'}">
        <div id="bee" ref="bee"></div>
      </div>
    </div>
    <br><br>
    This is the Hive View
    <br><br>
    Info for Dance:
    <br>
    id: {{ flowerInfo.identifier }},
    distance: {{ flowerInfo.distance }} units,
    angle: {{ flowerInfo.angle }} degrees,
    type: {{ flowerInfo.type  }}
  </div>
</template>

<script>
import { EventBus } from './../services/event-bus.js'
import { TweenMax, TweenLite, Linear } from 'gsap'
export default {
  name: 'Hive',
  components: {},
  props: {
    flowerInfo: Object
  },
  data () {
    return {
      startX: 200,
      startY: 300,
      stepX: 0,
      stepY: 0
    }
  },
  methods: {
    danceDance: function (distance) {
      let dance = []

      this.stepX = this.startX
      this.stepY = this.startY

      dance.push(this.stepForwards(this.stepX, this.stepY))

      for (let i = 0; i <= distance - 1; i++) {
        this.waggle(this.stepX, this.stepY, dance, i, distance)
      }

      dance.push(this.stepForwards(this.stepX, this.stepY))

      return dance
    },
    stepForwards: function (x, y) {
      this.stepY -= 30
      return { x: this.stepX, y: this.stepY }
    },
    waggle: function (x, y, dance, start, end) {
      for (let j = 0; j < 2; j++) {
        if (start === 0 && j === 0) {
          this.stepX -= 5
        } else {
          this.stepX -= 10
        }
        this.stepY -= 10
        dance.push({ x: this.stepX, y: this.stepY })
        if (start === end && j !== 0) {
          this.stepX += 5
        } else {
          this.stepX += 10
        }
        this.stepY -= 10
        dance.push({ x: this.stepX, y: this.stepY })
      }
    },
    generateBeeAnim: function () {
      let beeTween = TweenMax.to({}, 0, {})
      const { bee } = this.$refs

      let self = this
      function getPoints () {
        let danceSteps = self.danceDance(self.flowerInfo.distance)
        return danceSteps
        /* [

        //set forward 30 pixels
        { x: 150, y: 170 },

        //waggle
        { x: 145, y: 160 },
        { x: 155, y: 150 },

        { x: 145, y: 140 },
        { x: 155, y: 130 },

        { x: 145, y: 120 },
        { x: 155, y: 110 },

        { x: 145, y: 100 },
        { x: 155, y: 90 },

        { x: 145, y: 80 },
        { x: 155, y: 70 },

        //waggle end
        { x: 150, y: 30 },

        //left side loop
        { x: 80, y: 90 },
        { x: 80, y: 160 },

        { x: 150, y: 200 },
        { x: 150, y: 170 },
        { x: 145, y: 160 },
        { x: 155, y: 150 },
        { x: 145, y: 140 },
        { x: 155, y: 130 },
        { x: 145, y: 120 },
        { x: 155, y: 110 },
        { x: 145, y: 100 },
        { x: 155, y: 90 },
        { x: 145, y: 80 },
        { x: 155, y: 70 },
        { x: 150, y: 30 },

        { x: 220, y: 90 },
        { x: 220, y: 160 },

        { x: 150, y: 200 }
      ] */
      }

      function createNewTween () {
        var progress = beeTween.progress() + 0.01 || 0
        beeTween.progress(0).kill()
        TweenMax.set(bee, { x: 200, y: 300, rotation: 0 })
        beeTween = new TweenMax(bee, 3, {
          bezier: {
            values: getPoints(),
            autoRotate: true
          },
          ease: Linear.easeNone,
          repeat: -1
        })
        beeTween.progress(progress)
        beeTween.duration(5)
      }

      createNewTween()

      TweenLite.set(bee, { xPercent: 50, yPercent: 50 })
    }
  },
  created () {
    EventBus.$on('resetGame', reset => {
      let self = this
      setTimeout(function () {
        self.generateBeeAnim()
      }, 5)
    })
  },
  mounted () {
    this.generateBeeAnim()
  }
}
</script>

<style>
#hive {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#hive-interior {
  background-color: black;
  width: 400px;
  height: 400px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}

#bee-container {
  width: 400px;
  height: 400px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}

#bee {
  background: url(https://i.imgur.com/Pu0dk4y.png);
  background-size: contain;
  width: 30px;
  height: 30px;
  left: -30px;
  top: -30px;
  position: absolute;
}

.dot {
  position: absolute;
  border-radius: 50%;
  width: 2px;
  height: 2px;
  background: white;
}
</style>
