const path = require('path')
const fileHandler = require('fs')
const fileDescriptor = fileHandler.openSync(path.resolve('input.txt'), 'r')
const puzzleInput = fileHandler.readFileSync(fileDescriptor,'utf-8')

const itemPriorities = {}
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
for (let i = 0; i<52; i++){
    itemPriorities[alphabet[i]] = i+1
}

const backpackWithPockets = puzzleInput.split('\n').map(backpack => {
    const pocket1 = [], pocket2 = []
    const dividerPoint = backpack.length/2
    for (let i = 0; i < dividerPoint; i++) {
        pocket1.push(itemPriorities[backpack[i]])
    }
    for (let i = dividerPoint; i<backpack.length ; i++) {
        pocket2.push(itemPriorities[backpack[i]])
    }
    pocket1.sort((a,b) => a-b)
    pocket2.sort((a,b) => a-b)
    return pocket1.concat(pocket2)
})
const wrongItems = backpackWithPockets.map(backpack =>{
    let pocket1pointer = 0
    let pocket2pointer = backpack.length/2
    const limit = backpack.length/2
    for (pocket1pointer = 0; pocket1pointer < limit; pocket1pointer++) {
        while (backpack[pocket1pointer] > backpack[pocket2pointer]){
            pocket2pointer++
        }
        if (backpack[pocket1pointer] === backpack[pocket2pointer]){
            return backpack[pocket1pointer]
        }
    }
})
const total = wrongItems.reduce((prevValue,curValue) => prevValue + curValue)
console.log(`the total priority of misplaced items: ${total}`)
//loop over list of backpacks
//split each string in half - save to different vars?
//convert to numbers
//sort the two halves
//step over elements of array1, move pointer along until next array2 is greater than array1
//store repeated element
//sum element values