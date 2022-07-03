<template>
  <div id="hive">
    <div id="hive-interior">
      <div id="bee-audience-container">
        <div id="audience-origin">
          <div v-for="bee of audience" :key="bee.identifier">
            <div
              class="bee-audience-holder"
              v-bind:style="{
                height: bee.distance + 'px',
                transform: 'rotate(' + bee.angle + 'deg)',
              }"
            >
              <div
                class="audience-bee"
                style="transform: 'rotate(-90deg)'"
                :ref="'audience-' + bee.identifier"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="box-holder box1"></div>
      <div class="box-holder box2"></div>
      <div id="boombox">
        <img src="../assets/boomboxshadow.png" class="boombox-image-shadow"/>
        <img src="../assets/boombox.png" class="boombox-image" ref="boombox"/>
      </div>
      <div
        id="bee-container"
        v-bind:style="{ transform: 'rotate(' + flowerInfo.angle + 'deg)' }"
      >
        <div id="bee" ref="bee"></div>
      </div>
    </div>
    <!-- <br><br>
    This is the Hive View
    <br><br>
    Info for Dance:
    <br>
    id: {{ flowerInfo.identifier }},
    distance: {{ flowerInfo.distance }} units,
    angle: {{ flowerInfo.angle }} degrees,
    type: {{ flowerInfo.type  }} -->
  </div>
</template>

<script>
import { EventBus } from "./../services/event-bus.js";
import { TweenMax, TweenLite, Linear } from "gsap";
export default {
  name: "Hive",
  components: {},
  props: {
    flowerInfo: Object,
    hype: Number,
  },
  data() {
    return {
      startX: 200,
      startY: 300,
      stepX: 0,
      stepY: 0,
      audienceAmount: 200,
      audience: [],
      audienceAnimate: 0,
    };
  },
  methods: {
    danceDance: function (distance) {
      let dance = [];

      this.stepX = this.startX;
      this.stepY = this.startY;

      dance.push(this.stepForwards(this.stepX, this.stepY));

      for (let i = 0; i < distance; i++) {
        this.waggle(this.stepX, this.stepY, dance, i, distance);
      }

      dance.push(this.stepForwards(this.stepX, this.stepY));

      this.loopLeft(this.stepX, this.stepY, dance, distance);

      dance.push(this.stepForwards(this.stepX, this.stepY));

      for (let i = 0; i < distance; i++) {
        this.waggle(this.stepX, this.stepY, dance, i, distance);
      }

      dance.push(this.stepForwards(this.stepX, this.stepY));

      this.loopRight(this.stepX, this.stepY, dance, distance);

      return dance;
    },
    stepForwards: function (x, y) {
      this.stepY -= 30;
      return { x: this.stepX, y: this.stepY };
    },
    waggle: function (x, y, dance, start, end) {
      for (let j = 0; j < 2; j++) {
        if (start === 0 && j === 0) {
          this.stepX -= 5;
        } else {
          this.stepX -= 10;
        }
        this.stepY -= 10;
        dance.push({ x: this.stepX, y: this.stepY });
        if (start === end && j !== 0) {
          this.stepX += 5;
        } else {
          this.stepX += 10;
        }
        this.stepY -= 10;
        dance.push({ x: this.stepX, y: this.stepY });
      }
    },
    loopLeft: function (x, y, dance, distance) {
      dance.push({
        x: (this.stepX -= distance * 24),
        y: (this.stepY += distance * 20 + 60),
      });
      dance.push({
        x: (this.stepX = this.startX),
        y: (this.stepY = this.startY),
      });
    },
    loopRight: function (x, y, dance, distance) {
      dance.push({
        x: (this.stepX += distance * 24),
        y: (this.stepY += distance * 20 + 60),
      });
      dance.push({
        x: (this.stepX = this.startX),
        y: (this.stepY = this.startY),
      });
    },
    graduatedDuration: function (distance) {
      return 4 + distance * 3;
    },
    generateBeeAnim: function () {
      let beeTween = TweenMax.to({}, 0, {});
      const { bee } = this.$refs;

      let self = this;
      function getPoints() {
        let danceSteps = self.danceDance(self.flowerInfo.distance);
        return danceSteps;
      }

      function createNewTween() {
        var progress = beeTween.progress() + 0.01 || 0;
        beeTween.progress(0).kill();
        TweenMax.set(bee, { x: 200, y: 300, rotation: 0 });
        beeTween = new TweenMax(bee, 3, {
          bezier: {
            values: getPoints(),
            autoRotate: true,
          },
          ease: Linear.easeNone,
          repeat: -1,
        });
        beeTween.progress(progress);
        beeTween.duration(self.graduatedDuration(self.flowerInfo.distance));
      }

      createNewTween();

      TweenLite.set(bee, { xPercent: 50, yPercent: 50 });
    },
    generateBeeAudience: function (amount) {
      let array = [];
      let averageRotation = 360 / amount;
      let heldRotation = 0;
      for (let i = 0; i < amount; i++) {
        let bee = {};

        let circles = 0;
        if (heldRotation !== 0) {
          circles = Math.floor(heldRotation / 360);
        }

        let angleCalc = Math.floor(
          (Math.floor(Math.random() * (averageRotation * 10)) + 30) /
            (circles + 1)
        );

        let angle = angleCalc + heldRotation - 360 * circles;

        if (angle > 360) {
          circles++;
          angle = angleCalc + heldRotation - 360 * circles;
        }

        bee.angle = angle;
        heldRotation += angleCalc;

        bee.identifier = i;

        bee.distance = 24 * (circles + 1) + 130;
        array.push(bee);
      }
      return array;
    },
    animateAudienceBee(self) {
      for (let i = 1; i <= Math.floor(this.hype / 7); i++) {
        let audienceMember = self.$refs["audience-" + self.randomBee(self)];
        self.shakeRandomBee(audienceMember);
      }
    },
    randomBee(self) {
      return Math.floor(Math.random() * self.audienceAmount);
    },
    shakeRandomBee(bee) {
      let beeTween = TweenMax.to({}, 0, {});

      function createNewTween(bee) {
        var progress = beeTween.progress() + 0.01 || 0;
        beeTween.progress(0).kill();
        TweenMax.set(bee, { x: 0, y: 0, rotation: 0 });
        beeTween = new TweenMax(bee, 3, {
          bezier: {
            values: [
              { rotation: -20 },
              { rotation: 20 },
              { rotation: -20 },
              { rotation: 20 },
              { rotation: -20 },
              { rotation: 20 },
              { rotation: -20 },
              { rotation: 20 },
              { rotation: -20 },
              { rotation: 20 },
              { rotation: -20 },
              { rotation: 20 },
              { rotation: -20 },
              { rotation: 20 },
              { rotation: 0 },
            ],
            autoRotate: true,
          },
          ease: Linear.easeNone,
          repeat: 0,
        });
        beeTween.progress(progress);
        beeTween.duration(1.8);
      }

      createNewTween(bee);
    },
    animateBoombox() {
      let boombox = this.$refs["boombox"];
      let beeTween = TweenMax.to({}, 0, {});

      function createNewTween(boombox) {
        var progress = beeTween.progress() + 0.01 || 0;
        beeTween.progress(0).kill();
        TweenMax.set(boombox, { x: 0, y: 0, rotation: 0 });
        beeTween = new TweenMax(boombox, 3, {
          bezier: {
            values: [
              { rotation: -5, y: -20 },
              { rotation: 0, y: 0 },
              { rotation: 5, y: -20 },
              { rotation: 0, y: 0 },
            ],
            autoRotate: true,
          },
          ease: Linear.easeNone,
          repeat: -1,
        });
        beeTween.progress(progress);
        beeTween.duration(1);
      }

      createNewTween(boombox);
    },
    startGame() {
      this.generateBeeAnim();
      this.animateBoombox()
    }
  },
  created() {
    EventBus.$on('resetGame', reset => {
      let self = this
      setTimeout(function () {
        self.generateBeeAnim()
      }, 5)
    })
  },
  mounted() {
    this.audience = this.generateBeeAudience(this.audienceAmount);
    let self = this;
    clearInterval(this.audienceAnimate);
    this.audienceAnimate = setInterval(() => {
      self.animateAudienceBee(self);
    }, 600);
    EventBus.$on('startGame', reset => {
      setTimeout(() => {
        self.startGame()
      }, 1)
    })
    EventBus.$on('tutorialCall', reset => {
      let self = this
      setTimeout(function () {
        self.generateBeeAnim()
      }, 5)
    })
  },
  beforeDestroy() {
    clearInterval(this.audienceAnimate);
    EventBus.$off('resetGame')
    EventBus.$off('startGame')
    EventBus.$off('tutorialCall')
  },
};
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
  background-image: url('../../static/bgs/comb.png');
  background-repeat: repeat;
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
  background: url('../../static/bgs/bee-dancer.png');
  background-size: contain;
  width: 30px;
  height: 30px;
  left: -30px;
  top: -30px;
  position: absolute;
}

#bee-audience-container {
  width: 400px;
  height: 400px;
  overflow: hidden;
  position: absolute;
  margin: 0 auto;
}

#audience-origin {
  left: 50%;
  top: 50%;
  position: relative;
}

.bee-audience-holder {
  width: 0px;
  margin: 0 auto;
  position: absolute;
  transform-origin: bottom center;
  bottom: 0;
  background-color: black;
}

.audience-bee {
  background: url('../../static/bgs/bee-audience.png');
  background-size: contain;
  width: 30px;
  height: 30px;
  position: absolute;
}

#boombox {
  width: 60px;
  height: 40px;
  position: absolute;
  left: 270px;
  top: 200px;
}

.boombox-image {
  width: 100%;
  height: 100%;
}

.boombox-image-shadow {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  opacity: 0.7;
}

.box-holder {
  width: 60px;
  height: 60px;
  position: absolute;
}
.box1 {
  background: url('../../static/bgs/box1.png');
  top: 150px;
  left: 140px;
}
.box2 {
  background: url('../../static/bgs/box2.png');
  top: 180px;
  left: 180px;
}

.dot {
  position: absolute;
  border-radius: 50%;
  width: 2px;
  height: 2px;
  background: white;
}
</style>
