const { Howl } = require('howler');

const soundHandler = {
  sounds: {},
  createSound(src, name, volume) {
    let sound = new Howl({
      src: [src],
      volume: volume,
      onload: function() { console.log('song loaded!') },
      onloaderror: function(id, error) { console.log('loadError: ' + id + ' - ' + error) },
      onplay: () => { console.log('song playing ' + name) }
    });
    this.sounds[name] = sound
  },
  playSound(name) {
    this.sounds[name].play()
  },
  stopSound(name) {
    this.sounds[name].stop()
  }
}

export default soundHandler
