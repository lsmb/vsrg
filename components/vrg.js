import styles from './vrg.module.css'
import Canvas from './canvas'
import { cScroll, delNote, notesPassed, tHeights, noteIntervals } from '../utils/scroller'
import { Map } from '../utils/map'

import React, { useState, useEffect } from 'react'
import useEventListener from '@use-it/event-listener'

const ESCAPE_KEYS = ['27', 'Escape']
const PLAY_KEYS = { d: 64, f: 192, j: 320, k: 448 }
// const noteColors = { 64:  }

let positions = {}

export default function Vrg({ map }) {

  const [hits, setHits] = useState(0)

  const bm = new Map(map)
  const keyTimings = bm.keyTimings

  function handler({ key }) {
    if (ESCAPE_KEYS.includes(String(key))) {
      console.log('Escape key pressed!');
      // console.log(notesPassed)
      // notesClear()
      console.log(tHeights[64].length)
      console.log(noteIntervals)

    }


    if (Object.keys(PLAY_KEYS).includes(String(key))) {
      const latestNote = positions[parseInt(PLAY_KEYS[String(key)])][0]
      if (latestNote) {
        if (latestNote[1] > 440) {
          console.log("YA HIT IT")
          setHits(hits + 1)
          delNote(PLAY_KEYS[String(key)])
        }
      }
    }
  }
  useEventListener('keydown', handler);


  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // ctx.fillStyle = "black"
    // ctx.beginPath()
    // ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.004) ** 2, 0, 2 * Math.PI)
    // d: 64, f: 192, j: 320, k: 448
    ctx.fillStyle = "purple"
    ctx.fillRect(0, ctx.canvas.height - 60, ctx.canvas.width, 60)

    ctx.font = '12px'

    ctx.fillStyle = 'blue'
    ctx.textAlign = "center"
    ctx.fillText('D', (64 / 2) + 25, ctx.canvas.height - 30)
    ctx.fillText('F', (192 / 2) + 25, ctx.canvas.height - 30)
    ctx.fillText('J', (320 / 2) + 25, ctx.canvas.height - 30)
    ctx.fillText('K', (448 / 2) + 25, ctx.canvas.height - 30)



    for (const [key, value] of Object.entries(keyTimings)) {
      positions[key] = cScroll(ctx, key, "#FFFFFF", 8, key, value)
    }

    ctx.fill()
  }

  return (
    <div className={styles.vrg}>
      <p>{hits}</p>
      <Canvas draw={draw} height="500" width="300" />
    </div>
  );
}
