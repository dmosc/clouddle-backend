import express from 'express'
import cors from 'cors'
import { __rootdir, serverConfig } from './environment.mjs'
import { rooms } from './routes/index.mjs'
import DictionaryTrie from './routes/rooms/dictionary.mjs'
import { join } from 'path'
import readLine from 'readline'
import fs from 'fs'

const app = express()
app.use(cors())

app.use('/rooms', rooms)

app.listen(serverConfig.port, () => {
  console.log(`Serving ${process.env.npm_package_name} on port ${serverConfig.port}`)
})

const dictionaryTrie = new DictionaryTrie()
for (const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
  const file = join(__rootdir, 'resources', 'dictionary', `${letter}.csv`)
  const readLineInterface = readLine.createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
    terminal: false
  })
  readLineInterface.on('line', (line) => {
    const [word] = line.split(' ')
    if (/^[A-Za-z]/.test(word)) {
      dictionaryTrie.add(word.toLowerCase())
    }
  })
  readLineInterface.on('close', () => {
    console.log(dictionaryTrie.has('pyxis'))
  })
}
