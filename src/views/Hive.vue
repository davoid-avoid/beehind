<template>
  <div id="hive">
    <div id="bee-container">
      <div id="bee" ref="bee"></div>
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
        { x: 150, y: 150 },
        { x: 160, y: 145 },
        { x: 170, y: 155 },
        { x: 180, y: 145 },
        { x: 190, y: 155 },
        { x: 200, y: 145 },
        { x: 210, y: 155 },
        { x: 220, y: 145 },
        { x: 230, y: 155 },
        { x: 240, y: 150 },
        { x: 260, y: 150 },
        { x: 230, y: 90 },
        { x: 160, y: 90 },
        { x: 130, y: 150 },
        { x: 150, y: 150 },
        { x: 160, y: 145 },
        { x: 170, y: 155 },
        { x: 180, y: 145 },
        { x: 190, y: 155 },
        { x: 200, y: 145 },
        { x: 210, y: 155 },
        { x: 220, y: 145 },
        { x: 230, y: 155 },
        { x: 240, y: 150 },
        { x: 260, y: 150 },
        { x: 230, y: 210 },
        { x: 160, y: 210 },
        { x: 130, y: 150 }
      ]
    }

    function createNewTween () {
      var progress = beeTween.progress() + 0.01 || 0
      beeTween.progress(0).kill()
      TweenMax.set(bee, { x: 130, y: 150, rotation: 0 })
      beeTween = new TweenMax(bee, 3, {
        bezier: {
          values: getPoints(),
          autoRotate: true
        },
        ease: Linear.easeNone,
        repeat: -1
      })
      beeTween.progress(progress)
      beeTween.duration(6)
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

#bee-container {
  background-color: black;
  width: 300px;
  height: 300px;
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
