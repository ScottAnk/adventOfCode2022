const path = require('path')
const fileHandler = require('fs')
const fileDescriptor = fileHandler.openSync(path.resolve('input.txt'), 'r')
const puzzleInput = fileHandler.readFileSync(fileDescriptor, 'utf-8')

const findMarker = (stream) => {
  const bufferLength = 14
  let foundMarker = true
  for (let i = bufferLength - 1; i < stream.length; i++) {
    const buffer = []
    for (let j = 0; j < 14; j++) {
      buffer[j] = stream[i - (13 - j)]
    }
    foundMarker = true
    let j, k
    comparisonLoop: 
    for (j = 0; j < bufferLength - 1; j++) {
      for (k = j + 1; k < bufferLength; k++) {
        if (buffer[j] === buffer[k]) {
          foundMarker = false
          break comparisonLoop
        }
      }
    }
    if (foundMarker) {
      return i + 1
    }
  }
  return null
}

console.log(`the first message marker is at: ${findMarker(puzzleInput)}`)
