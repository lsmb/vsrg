export let tHeights = {}
export let noteIntervals = []
export let notesPassed = 0


function createNote(ctx, color, s, key, time) {
  if (!(key in noteIntervals)) {
    noteIntervals[key] = []
  }
  setTimeout(() => {
    tHeights[key][time] = 0
    noteIntervals[key][time] = setInterval(() => {
      if (tHeights[key][time] < 500) {
        tHeights[key][time] += 2
      } else {
        // console.log(`Done with ${key}, ${time}. Height: ${tHeights[key][time]}`)
        // console.log(noteIntervals[key][time])
        clearInterval(noteIntervals[key][time])
        delete tHeights[key][time]
        delete noteIntervals[key][time]
        notesPassed++
      }

    }, s)
  }, time.split("a")[1])
}

function createNotesOsu(ctx, x, color, speed, key, times) {
  if (!(key in tHeights)) {
    tHeights[key] = []
    console.log('yo')
    times.forEach((note) => {
      createNote(ctx, color, speed, key, note["time"])
      // console.log(note["time"])
    })
  }
}

export function cScroll(ctx, x, color, speed, key, times) {

  createNotesOsu(ctx, x, color, speed, key, times)


  let pos = new Set()
  // console.log(tHeights[key])
  Object.entries(tHeights[key]).forEach(time => {
    ctx.fillStyle = color
    ctx.fillRect(x / 2, time[1], 50, 10)
    ctx.fill()
    pos.add(time)
  })

  return Array.from(pos)
}

export function delNote(key) {

  let latestTime = Object.keys(tHeights[key])[0]
  console.log("yaoo", latestTime)
  clearInterval(noteIntervals[key][latestTime])
  delete tHeights[key][latestTime]

}
