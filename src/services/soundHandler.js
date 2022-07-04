import { EventBus } from './event-bus.js'
const { Howl } = require('howler');

const soundHandler = {
  sounds: {},
  volumes: {},
  createSound(src, name, volume, loop) {
    let sound = new Howl({
      src: [src],
      volume: volume,
      loop: loop,
      onload: function() { EventBus.$emit('soundLoaded') },
      onloaderror: function(id, error) { console.log('loadError: ' + id + ' - ' + error) },
      onend: function() {
        EventBus.$emit('soundEnd', name)
      }
    });
    this.sounds[name] = sound
    this.volumes[name] = volume
  },
  playSound(name) {
    this.sounds[name].stop()
    this.sounds[name].seek(0)
    this.sounds[name].volume(this.volumes[name])
    this.sounds[name].play()
  },
  stopSound(name) {
    this.sounds[name].stop()
  },
  fadeOutSound(name) {
    this.sounds[name].fade(this.volumes[name], 0, 1000)
    let self = this;
    setTimeout(() => {
      self.stopSound(name)
    }, 1000)
  },
  fadeInSound(name) {
    this.stopSound(name)
    this.sounds[name].volume(0)
    this.sounds[name].fade(0, this.volumes[name], 1000)
    this.playSound(name)
  }
}

export default soundHandler
