import DictionaryTrie from '../classes/dictionary.mjs'
import { join } from 'path'
import { __rootdir } from '../environment.mjs'
import readLine from 'readline'
import fs from 'fs'

async function loadDictionary () {
  const dictionaryTrie = new DictionaryTrie()
  const file = join(__rootdir, 'resources', 'dictionary.txt')
  const readLineInterface = readLine.createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
    terminal: false
  })
  for await (const line of readLineInterface) {
    const [word] = line.split(' ')
    dictionaryTrie.add(word.replace(/[^A-Za-z]/, '').toLowerCase())
  }
  return dictionaryTrie
}

export default loadDictionary
