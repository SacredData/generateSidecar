const { Album } = require('baptism')
const concat = require('./concat')
const fpcalc = require('fpcalc')
const fs = require('fs')
const path = require('path')
const waveform = require('./waveform')

function regions(cb) {
  const album = new Album('./test/2')
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

regions((cb) => {
  console.log('done', cb)
  fs.writeFileSync('./sidecar_SMXXX.json', cb)
})
