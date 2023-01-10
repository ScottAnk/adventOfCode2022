const fileHandler = require('fs')
const fileDescriptor = fileHandler.openSync('./input.txt', 'r')
const puzzleInput = fileHandler.readFileSync(fileDescriptor, 'utf-8')

const visibilityScan = (treeHeight, currentRow, currentColumn) => {
  let visibleFromTop = true
  for (let i = 0; i < currentRow; i++) {
    if (treeMap[i][currentColumn] >= treeHeight) {
      visibleFromTop = false
      break
    }
  }

  let visibleFromLeft = true
  for (let j = 0; j < currentColumn; j++) {
    if (treeMap[currentRow][j] >= treeHeight) {
      visibleFromLeft = false
      break
    }
  }

  let visibleFromBottom = true
  for (let i = treeMap.length - 1; i > currentRow; i--) {
    if (treeMap[i][currentColumn] >= treeHeight) {
      visibleFromBottom = false
      break
    }
  }

  let visibleFromRight = true
  for (let j = treeMap[0].length - 1; j > currentColumn; j--) {
    if (treeMap[currentRow][j] >= treeHeight) {
      visibleFromRight = false
      break
    }
  }
  if (
    visibleFromTop ||
    visibleFromLeft ||
    visibleFromBottom ||
    visibleFromRight
  ) {
    return 1
  } else {
    return 0
  }
}

const treeMap = puzzleInput.split('\n').map((row) => row.split(''))
let visibleTrees = 0
for (let rowPointer = 0; rowPointer < treeMap.length; rowPointer++) {
  for (
    let columnPointer = 0;
    columnPointer < treeMap[0].length;
    columnPointer++
  ) {
    const currentTree = treeMap[rowPointer][columnPointer]
    visibleTrees += visibilityScan(currentTree, rowPointer, columnPointer)
  }
}

console.log(`The number of visible trees is ${visibleTrees}`)
