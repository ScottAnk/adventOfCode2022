const path = require('path')
const fileHandler = require('fs')
const fileDescriptor = fileHandler.openSync(path.resolve('input.txt'), 'r')
/*const puzzleInput = fileHandler.readFile(fileDescriptor, {encoding:'utf-8'; flag:string},()=>{
    console.log(puzzleInput)
})*/
const puzzleInput = fileHandler.readFileSync(fileDescriptor,'utf-8')
console.log(puzzleInput)
