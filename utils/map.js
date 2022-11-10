// export function getSplit(map) {

//   return map.split(/\n\s*\n/)
// }

export class Map {
  constructor(mapfile) {
    this.mapfile = mapfile
  }

  get general() {
    return this.getSections()[1]
  }

  get keyTimings() {
    let keyTimes = {}
    this.hitObjects.forEach(note => {
      let [x, _, time, type, hitSound, endTime, hitSample] = note.split(',')
      if (!(x in keyTimes)) {
        keyTimes[x] = []
      }
      keyTimes[x].push({ time: `a${time}`, type: type, hitSound: hitSound, endTime: endTime })
    })
    return keyTimes
  }

  get hitObjects() {
    const splitSections = this.getSections()[7].split("\r\n")
    return splitSections.slice(1, splitSections.length - 1)
  }

  get mapFile() {
    return this.getSections()
  }

  getSections() {
    return this.mapfile.split(/\n\s*\n/)
  }
}



