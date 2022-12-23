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
const backpackPriorities = backpackWithPockets.map(backpack => 
    backpack.sort((a,b) => a-b))
const groupBadges = []
for (let i = 0; i < backpackPriorities.length; i = i + 3) {
    //using two pointer search: look for same items in first two backpacks
    //using two pointer search: look for matching item between first list and third backpack
    let pointer1 = 0, pointer2 = 0
    const matchingItems = []
    for (pointer1 = 0; pointer1 < backpackPriorities[i].length; pointer1++) {
        const val1 = backpackPriorities[i][pointer1]
        while (val1 > backpackPriorities[i+1][pointer2]) {
            pointer2++
        }
        if (val1 === backpackPriorities[i+1][pointer2]){
            matchingItems.push(val1)
        }
    }
    pointer2 = 0
    for (pointer1 = 0; pointer1 < matchingItems.length; pointer1++){
        const val1 = matchingItems[pointer1]
        while (val1 > backpackPriorities[i+2][pointer2]){
            pointer2++
        }
        if (val1 === backpackPriorities[i+2][pointer2]){
            groupBadges.push(val1)
            break
        }
    }
}
console.log(`sanity check: ${(groupBadges.length === backpackPriorities.length/3) ? 'pass' : 'fail'}`)
const total = wrongItems.reduce((prevValue,curValue) => prevValue + curValue)
console.log(`the total priority of misplaced items: ${total}`)
const groupBadgeTotal = groupBadges.reduce((prevValue,curValue) => prevValue + curValue)
console.log(`sum of group badges: ${groupBadgeTotal}`)