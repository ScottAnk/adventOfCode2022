const path = require('path')
const fileHandler = require('fs')
const fileDescriptor = fileHandler.openSync(path.resolve('input.txt'), 'r')
const puzzleInput = fileHandler
  .readFileSync(fileDescriptor, 'utf-8')
  .split('\n')

const pileCache = []
let rowPointer = 0
while (puzzleInput[rowPointer][1] != '1') {
  pileCache.push(puzzleInput[rowPointer])
  rowPointer++
}
const pileNum = puzzleInput[rowPointer].split('   ').length
rowPointer += 2

const piles = new Array(pileNum).fill(0).map((_) => [])
for (let i = pileCache.length - 1; i >= 0; i--) {
  for (let j = 0; j < pileNum; j++) {
    if (pileCache[i][1 + j * 4] != ' ') {
      piles[j].push(pileCache[i][1 + j * 4])
    }
  }
}

for (rowPointer; rowPointer < puzzleInput.length; rowPointer++) {
  const instructions = puzzleInput[rowPointer].split(' ')
  const repeatCount = Number(instructions[1])
  const source = Number(instructions[3])
  const target = Number(instructions[5])

  for (let i = 0; i < repeatCount; i++)
    piles[target - 1].push(piles[source - 1].pop())
}

console.log(
  `crates on top: ${piles
    .map((pile) => pile.pop())
    .reduce((concat, next) => (concat += next))}`
)
