const path = require('path')
const fileHandler = require('fs')
const fileDescriptor = fileHandler.openSync(path.resolve('input.txt'), 'r')
const puzzleInput = fileHandler.readFileSync(fileDescriptor,'utf-8')

class Navigator {
    constructor(fileNode) {
        this.currentNode = fileNode
    }

    changeDirectory (dirName) {
        // {.. ; / ; [name]}
        if (dirName === '/') {
            while (this.currentNode.parent) {
                this.currentNode = this.currentNode.parent
            }
        } else if (dirName === '..') {
            if (this.currentNode.parent) {
                this.currentNode = this.currentNode.parent
            }
        } else {
            this.currentNode = this.currentNode.children[dirName]
        }
    }

}

class FileNode {
    constructor(name, parent = null, size = 0) {
        this.name = name
        this.parent = parent
        this.size = size
        this.children = {}
    }

    addNode (name, size=0) {
        this.children[name] = new FileNode(name, this, size)
        this.size += size
        if (this.parent) {
            this.parent.grow(size)
        }
    }

    grow (size) {
        this.size += size
        if (this.parent) {
            this.parent.grow(size)
        }
    }
}

const root = new FileNode('/')
const navigator = new Navigator(root)
const commandLines = puzzleInput.split('\n')

for (let i = 0; i < commandLines.length; i++) {
    const lineParts = commandLines[i].split(' ')
    if (lineParts[0] === '$') {
        switch (lineParts[1]) {
            case 'cd':
                navigator.changeDirectory(lineParts[2])
                break
            case 'ls':
                break
        }
    } else {
        if (lineParts[0] == 'dir') {
            navigator.currentNode.addNode(lineParts[1])
        } else {
            navigator.currentNode.addNode(lineParts[1], Number(lineParts[0]))
        }
    }
}

const findDeletableFolders = (fileNode) => {
    let sumOfSizes = 0
    if (Object.keys(fileNode.children).length !== 0){
        for (childName in fileNode.children) {
            sumOfSizes += findDeletableFolders(fileNode.children[childName])
        }
        if (fileNode.size <= 100000){
            sumOfSizes += fileNode.size 
        }
    }
    return sumOfSizes
}
const sizeOfDeletableFolders = findDeletableFolders(root)
console.log(`the total size of deletable folders is ${sizeOfDeletableFolders}`)