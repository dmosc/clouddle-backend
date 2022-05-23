class TrieNode {
  constructor (char) {
    this.char = char
    this.isEnd = false
    this.children = []
  }

  getRandomChild () {
    const childrenCount = this.children.length
    if (childrenCount) {
      const i = Math.floor(Math.random() * childrenCount)
      return this.children[i]
    }
    return null
  }
}

export default TrieNode
