import DictionaryTrie from '../classes/dictionary.mjs'
import { join } from 'path'
import { __rootdir } from '../environment.mjs'
import readLine from 'readline'
import fs from 'fs'

async function loadDictionary () {
  const dictionaryTrie = new DictionaryTrie()
  const readLineInterface = readLine.createInterface({
    input: fs.createReadStream(join(__rootdir, 'resources', 'dictionary.txt')),
    output: process.stdout,
    terminal: false
  })
  for await (const word of readLineInterface) {
    dictionaryTrie.add(word)
  }
  return dictionaryTrie
}

export default loadDictionary
