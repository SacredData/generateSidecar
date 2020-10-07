// audiowaveform -i SMOLD_024.mp3 -b 8 -o SMOLD_024.json --pixels-per-second 20

const path = require('path')
const spawn = require('child_process').spawn

function main(mp3) {
  const jsonOut = `${path.basename(mp3, path.extname(mp3))}.json`
  spawn('audiowaveform', [
    "-i",
    path.resolve(mp3),
    "-b",
    "8",
    "-o",
    jsonOut,
    "--pixels-per-second",
    "20"
  ]).on('close', code => {
    console.log(`Exited with code ${code}`)
    spawn('python', [
      'scale.py',
      jsonOut
    ]).on('close', code => {
      console.log(`Python scale command exited with code ${code}`)
    })
  })
}

module.exports = main
