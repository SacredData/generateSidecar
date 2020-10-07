const path = require('path')
const spawn = require('child_process').spawn

function main(tracks, release="SMXXX") {
  spawn('sox', [
    ...tracks, `${release}.wav`
  ]).on('close', code => {
    console.log(`SoX concat command exited with code ${code}`)
    spawn('sox', [
      `${release}.wav`, `${release}`.mp3
    ]).on('close', code => {
      console.log(`Concat command exited with code ${code} WAV concerted to MP3`)
    })
  })
}
