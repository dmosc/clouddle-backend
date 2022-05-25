import TrieNode from './trie-node.mjs'

class DictionaryTrie {
  constructor () {
    this.root = new TrieNode()
  }

  getRoot () {
    return this.root
  }

  getRandomPrefix (length = 1) {
    let prefix = ''
    let node = this.getRoot(); let child = node.getRandomChild()
    while (child && length--) {
      prefix += child.char
      node = child
      child = node?.getRandomChild()
    }
    return prefix
  }

  add (word) {
    let found; let node = this.getRoot()
    for (const char of word) {
      found = false
      for (const child of node.children) {
        if (child.char === char) {
          node = child
          found = true
          break
        }
      }
      if (!found) {
        const newNode = new TrieNode(char)
        node.children.push(newNode)
        node = newNode
      }
    }
    node.isEnd = true
  }

  has (word) {
    let found; let node = this.getRoot()
    for (const char of word) {
      found = false
      for (const child of node.children) {
        if (child.char === char) {
          found = true
          node = child
        }
      }
      if (!found) {
        return false
      }
    }
    return node.isEnd
  }

  display (node, padding) {
    console.log(`${padding}${node.char ? node.char : '*'} ${node.isEnd ? '[e]' : ''}`)
    padding += node.isEnd ? '  ' : '| '
    for (const child of node.children) {
      this.display(child, padding)
    }
  }
}

export default DictionaryTrie
