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
import { TweenMax, TweenLite, Linear } from 'gsap'
export default {
  name: 'Hive',
  components: {},
  props: {
    flowerInfo: Object
  },
  methods: {},
  created () {},
  mounted () {
    let beeTween = TweenMax.to({}, 0, {})
    const { bee } = this.$refs

    function getPoints () {
      return [
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
      ]
    }

    function createNewTween () {
      var progress = beeTween.progress() + 0.01 || 0
      beeTween.progress(0).kill()
      TweenMax.set(bee, { x: 150, y: 200, rotation: 0 })
      beeTween = new TweenMax(bee, 3, {
        bezier: {
          values: getPoints(),
          autoRotate: true
        },
        ease: Linear.easeNone,
        repeat: -1
      })
      beeTween.progress(progress)
      beeTween.duration(7)
    }

    createNewTween()

    TweenLite.set(bee, { xPercent: 50, yPercent: 50 })
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
  margin-top: 60px;
}

#hive-interior {
  background-color: black;
  width: 300px;
  height: 230px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}

#bee-container {
  width: 300px;
  height: 230px;
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
