const fileHandler = require('fs')
const fileDescriptor = fileHandler.openSync('./input.txt', 'r')
const puzzleInput = fileHandler.readFileSync(fileDescriptor, 'utf-8')

const scanViews = (treeHeight, currentRow, currentColumn) => {
  let exitWithBreak = false 
  let viewUpward = 0
  for (let i = currentRow - 1; i > -1; i--) {
    if (treeMap[i][currentColumn] >= treeHeight) {
      viewUpward = currentRow - i
      exitWithBreak = true
      break
    } 
  }
  if (!exitWithBreak) {viewUpward = currentRow}

  exitWithBreak = false
  let viewLeftward = 0
  for (let j = currentColumn - 1; j > -1; j--) {
    if (treeMap[currentRow][j] >= treeHeight) {
      viewLeftward = currentColumn - j
      exitWithBreak = true
      break
    }
  }
  if (!exitWithBreak) {viewLeftward = currentColumn}

  exitWithBreak = false
  let viewDownward = 0
  for (let i = currentRow + 1; i < treeMap.length ; i++) {
    if (treeMap[i][currentColumn] >= treeHeight) {
      viewDownward = i - currentRow
      exitWithBreak = true
      break
    }
  }
  if (!exitWithBreak) {viewDownward = treeMap.length - 1 - currentRow}
  
  exitWithBreak = false
  let viewRightward = 0
  for (let j = currentColumn + 1; j < treeMap[0].length; j++) {
    if (treeMap[currentRow][j] >= treeHeight) {
      viewRightward = j - currentColumn
      exitWithBreak = true
      break
    }
  }
  if (!exitWithBreak) {viewRightward = treeMap[0].length - 1 - currentColumn}
  
  return viewUpward * viewLeftward * viewDownward * viewRightward
}

const treeMap = puzzleInput.split('\n').map((row) => row.split(''))
let scenicScore = 0
for (let rowPointer = 0; rowPointer < treeMap.length; rowPointer++) {
  for (
    let columnPointer = 0;
    columnPointer < treeMap[0].length;
    columnPointer++
  ) {
    const currentTree = treeMap[rowPointer][columnPointer]
    scenicScore = Math.max(scenicScore, scanViews(currentTree, rowPointer, columnPointer))
  }
}

console.log(`The best scenic score in the grove is ${scenicScore}`)