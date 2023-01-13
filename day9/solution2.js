const fileHandler = require('fs')
const { runInThisContext } = require('vm')
const fileDescriptor = fileHandler.openSync('./input.txt', 'r')
const puzzleInput = fileHandler.readFileSync(fileDescriptor, 'utf-8')

class Knot {
    constructor(nextKnot = null) {
        this.nextKnot = nextKnot
        this.x = 0
        this.y = 0
    }

    move (deltaX, deltaY) {
        this.x += deltaX
        this.y += deltaY

        const tailNeedsToMove = Math.abs(this.x - this.nextKnot.x) > 1 || Math.abs(this.y - this.nextKnot.y) > 1
        if (tailNeedsToMove) {
            const deltaX = this.x - this.nextKnot.x
            const deltaY = this.y - this.nextKnot.y

            if (Math.abs(deltaX) === 0) {
                this.nextKnot.move(0, deltaY / 2)
            } else if (Math.abs(deltaY) === 0) {
                this.nextKnot.move(deltaX / 2, 0)
            } else {
                this.nextKnot.move(Math.sign(deltaX), Math.sign(deltaY))
            }
        }
    }
}

class Tail extends Knot{
    constructor() {
        super()
        this.visitedLocations = {'0_0' : true}
    }
    
    move (deltaX, deltaY) {
        this.x += deltaX
        this.y += deltaY
        this.visitedLocations[`${this.x}_${this.y}`] = true
    }
}

const directionVectors = {
    "U" : [0, 1],
    "D" : [0, -1],
    "R" : [1, 0],
    "L" : [-1, 0]
}

const rope = new Array(10)
const tail = new Tail()
rope[9] = tail 
for (let i = 8; i > -1; i--) {
    rope[i] = new Knot(rope[i+1])
}
const head = rope[0]
const instructions = puzzleInput.split('\n')

for (let i = 0; i < instructions.length; i++) {
    const [direction, numerals] = instructions[i].split(' ')
    const [headXdir, headYdir] = directionVectors[direction]

    let steps = Number(numerals)
    while (steps > 0) {
        steps--
        head.move(headXdir, headYdir)
    }
}

console.log(`The tail occupied ${Object.keys(tail.visitedLocations).length} locations`)
//lower than 6502