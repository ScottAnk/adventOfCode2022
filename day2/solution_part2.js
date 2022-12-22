const path = require('path')
const fileHandler = require('fs')
const fileDescriptor = fileHandler.openSync(path.resolve('input.txt'), 'r')
/*const puzzleInput = fileHandler.readFile(fileDescriptor, {encoding:'utf-8'; flag:string},()=>{
    console.log(puzzleInput)
})*/
const puzzleInput = fileHandler.readFileSync(fileDescriptor,'utf-8')
const scoreCombinations = {
    'A X':0+3,
    'A Y':3+1,
    'A Z':6+2,
    'B X':0+1,
    'B Y':3+2,
    'B Z':6+3,
    'C X':0+2,
    'C Y':3+3,
    'C Z':6+1,
}
let scoreTotal = 0
puzzleInput.split('\n').forEach(game =>{
    scoreTotal += scoreCombinations[game]
})
console.log(`your total score is: ${scoreTotal}`)