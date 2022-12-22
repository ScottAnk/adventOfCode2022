const path = require('path')
const fileHandler = require('fs')
const fileDescriptor = fileHandler.openSync(path.resolve('input.txt'), 'r')
const puzzleInput = fileHandler.readFileSync(fileDescriptor,'utf-8')

const itemPriorities = {}
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
for (let i = 0; i<52; i++){
    itemPriorities[alphabet[i]] = i+1
}

const backpackPriorities = puzzleInput.split('\n').map(backpack => {
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
    return [pocket1, pocket2]
})
const wrongItems = backpackPriorities.map(pockets =>{
    let pocket1pointer = 0, pocket2pointer = 0
    const limit = pockets[0].length
    for (pocket1pointer = 0; pocket1pointer < limit; pocket1pointer++) {
        if (pockets[0][pocket1pointer] === pockets[1][pocket2pointer]){
            return pockets[0][pocket1pointer]
        } else if (pockets[0][pocket1pointer] < pockets[1][pocket2pointer]){
            continue
        } else {
            while (pockets[0][pocket1pointer] > pockets[1][pocket2pointer]){
                pocket2pointer++
            }
            if (pockets[0][pocket1pointer] === pockets[1][pocket2pointer]){
                return pockets[0][pocket1pointer]
            }
        }
    }

})
const total = wrongItems.reduce((prevValue,curValue) => prevValue + curValue)
console.log(`the total priority of misplaced items: ${total}`)