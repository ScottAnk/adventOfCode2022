const path = require('path')
const fileHandler = require('fs')
const fileDescriptor = fileHandler.openSync(path.resolve('input.txt'), 'r')
const puzzleInput = fileHandler.readFileSync(fileDescriptor, 'utf-8')

const elfPairs = puzzleInput.split('\n')
let partialOverlapSets = 0
for (let pair = 0; pair < elfPairs.length; pair++) {
  const [[elf1Start, elf1End], [elf2Start, elf2End]] = elfPairs[pair]
    .split(',')
    .map((range) => range.split('-').map((i) => Number(i)))
  if (
    (elf1Start <= elf2Start && elf1End >= elf2Start) ||
    (elf2Start <= elf1Start && elf2End >= elf1Start)
  ) {
    partialOverlapSets++
  }
}

console.log(
  `Number of pairs with fully overlapping ranges: ${partialOverlapSets}`
)
