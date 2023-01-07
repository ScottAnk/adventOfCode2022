const path = require('path')
const fileHandler = require('fs')
const fileDescriptor = fileHandler.openSync(path.resolve('input.txt'), 'r')
const puzzleInput = fileHandler.readFileSync(fileDescriptor, 'utf-8')

class Navigator {
  constructor(fileNode) {
    this.currentNode = fileNode
  }

  changeDirectory(dirName) {
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

  addNode(name, size = 0) {
    this.children[name] = new FileNode(name, this, size)
    this.size += size
    if (this.parent) {
      this.parent.grow(size)
    }
  }

  grow(size) {
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

const diskSpace = 70000000
const updateSize = 30000000
const freeSpace = diskSpace - root.size
const spaceNeeded = updateSize - freeSpace
const findBestFolderToDelete = (fileNode, spaceNeeded, currentBest) => {
  //check if it's a folder
  const nodeIsFile = Object.keys(fileNode.children).length === 0
  if (nodeIsFile) {
    return currentBest
  } else {
    //check children for best
    for (childName in fileNode.children) {
      currentBest = findBestFolderToDelete(
        fileNode.children[childName],
        spaceNeeded,
        currentBest
      )
    }
  }

  //check if it's bigger than space needed
  //check if it's smaller than current best
  if (fileNode.size > spaceNeeded && fileNode.size < currentBest) {
    return fileNode.size
  }
  return currentBest
}

const bestFolderSize = findBestFolderToDelete(root, spaceNeeded, root.size)
console.log(`the smallest folder with enough space is ${bestFolderSize} bits`)
