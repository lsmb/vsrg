import fs from 'fs'
import path from 'path'

const dir = path.join(process.cwd(), 'maps')

export function getMapFile(name) {
  // const mapFile = fs.readFileSync('./').toString('utf-8')
  let mapFile = fs.readFileSync(dir + '/' + name).toString()
  return mapFile
}
