const path = require('path')
const fileHandler = require('fs')
const fileDescriptor = fileHandler.openSync(path.resolve('input.txt'), 'r')
const puzzleInput = fileHandler.readFileSync(fileDescriptor, 'utf-8')

const findMarker = (stream) => {
  for (let i = 3; i < stream.length; i++) {
    const l1 = stream[i - 3]
    const l2 = stream[i - 2]
    const l3 = stream[i - 1]
    const l4 = stream[i]
    if (l1 != l2 && l1 != l3 && l1 != l4 && 
        l2 != l3 && l2 != l4 && 
        l3 != l4) {
      return i + 1
    }
  }
  return null
}

console.log(`the first marker is at: ${findMarker(puzzleInput)}`)
