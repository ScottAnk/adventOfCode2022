const path = require('path')
const fileHandler = require('fs')
const fileDescriptor = fileHandler.openSync(path.resolve('input.txt'), 'r')
/*const puzzleInput = fileHandler.readFile(fileDescriptor, {encoding:'utf-8'; flag:string},()=>{
    console.log(puzzleInput)
})*/
const puzzleInput = fileHandler.readFileSync(fileDescriptor,'utf-8')
const scoreCombinations = {
    'A X':3+1,
    'A Y':6+2,
    'A Z':0+3,
    'B X':0+1,
    'B Y':3+2,
    'B Z':6+3,
    'C X':6+1,
    'C Y':0+2,
    'C Z':3+3,
}
let scoreTotal = 0
puzzleInput.split('\n').forEach(game =>{
    scoreTotal += scoreCombinations[game]
})
console.log(`your total score is: ${scoreTotal}`)