const fileHandler = require('fs')
const { runInThisContext } = require('vm')
const fileDescriptor = fileHandler.openSync('./input.txt', 'r')
const puzzleInput = fileHandler.readFileSync(fileDescriptor, 'utf-8')


class Knot {
    constructor() {
        this.x = 0
        this.y = 0
    }

    move (deltaX, deltaY) {
        this.x += deltaX
        this.y += deltaY
    }
}

class Tail extends Knot{
    constructor() {
        super()
        this.visitedLocations = {'0_0' : true}
    }
    
    move (deltaX, deltaY) {
        super.move(deltaX, deltaY)
        this.visitedLocations[`${this.x}_${this.y}`] = true
    }
}

const directionVectors = {
    "U" : [0, 1],
    "D" : [0, -1],
    "R" : [1, 0],
    "L" : [-1, 0]
}
const tail = new Tail()
const head = new Knot()
const instructions = puzzleInput.split('\n')

for (let i = 0; i < instructions.length; i++) {
    const [direction, numerals] = instructions[i].split(' ')
    const [headXdir, headYdir] = directionVectors[direction]

    let steps = Number(numerals)
    while (steps > 0) {
        steps--
        
        head.move(headXdir, headYdir)

        const tailNeedsToMove = Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1
        if (tailNeedsToMove) {
            const deltaX = head.x - tail.x
            const deltaY = head.y - tail.y

            if (Math.abs(deltaX) === 0) {
                tail.move(0, deltaY / 2)
            } else if (Math.abs(deltaY) === 0) {
                tail.move(deltaX / 2, 0)
            } else {
                tail.move(Math.sign(deltaX), Math.sign(deltaY))
            }
        }
    }
}

console.log(`The tail occupied ${Object.keys(tail.visitedLocations).length} locations`)
