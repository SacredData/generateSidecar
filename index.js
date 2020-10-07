const { Album } = require('baptism')
const concat = require('./concat')
const fs = require('fs')
const path = require('path')
const waveform = require('./waveform')

function regions(dir, cb) {
  const album = new Album(dir)
  album.probe((err, res) => {
    console.log(err, res)
    const trackKeys = Object.keys(res).sort()
    console.log(trackKeys)
    // const tracks = trackKeys.map(t => [t, res[t].duration])
    const tracks = trackKeys.map(t => {
      return {
        path: path.resolve(t),
        id: path.basename(t, path.extname(t)).substring(5),
        duration: res[t].duration,
        loop: false,
        drag: false,
        resize: false
      }
    })
    console.log(tracks)

    cb(JSON.stringify({
      regions: tracks
    }))
  })
}

regions('./test/2', (cb) => {
  console.log('done', cb)
  fs.writeFileSync('./sidecar_SMXXX.json', cb)
})
