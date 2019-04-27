<template>
  <div id="hive">
    <img src="../assets/hive-01.png">
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
export default {
  name: 'Hive',
  components: {

  },
  props: {
    flowerInfo: Object
  },
  methods: {

  },
  created () {
    console.log(this.flowerInfo)
  }
}
</script>

<style>
#hive {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
