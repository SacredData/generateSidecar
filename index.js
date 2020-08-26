const { Album } = require('baptism')
const fs = require('fs')
const path = require('path')




function main(cb) {
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

    /*
    let start = 0.0;

    tracks.forEach(track => {
      track.start = start
      start += track.duration
      track.end = start
    })

    console.log(tracks)
    */

    cb(JSON.stringify({
      regions: tracks
    }))
  })
}

main((cb) => {
  console.log('done', cb)
  fs.writeFileSync('./sidecar_SMXXX.json', cb)
})
