import DictionaryTrie from '../routes/rooms/dictionary.mjs'
import { ALPHABET } from '../constants.mjs'
import { join } from 'path'
import { __rootdir } from '../environment.mjs'
import readLine from 'readline'
import fs from 'fs'

async function loadDictionary () {
  const dictionaryTrie = new DictionaryTrie()
  let readLineInterface
  for (const letter of ALPHABET) {
    const file = join(__rootdir, 'resources', 'dictionary', `${letter}.csv`)
    readLineInterface = readLine.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false
    })
    for await (const line of readLineInterface) {
      const [word] = line.split(' ')
      dictionaryTrie.add(word.replace(/[^A-Za-z]/, '').toLowerCase())
    }
  }
  return dictionaryTrie
}

export default loadDictionary
