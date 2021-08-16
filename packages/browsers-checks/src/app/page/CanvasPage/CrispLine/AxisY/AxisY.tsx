import React, {useEffect, useRef} from 'react'
import {truncTo05} from '../../common'
import s from './AxisY.module.css'

const width = 250
const height = 380

export function AxisY() {
  const refCanvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = refCanvas.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    ctx.strokeStyle = 'black'
    ctx.font = '10px Verdana'
    ctx.fillStyle = 'blue'
    ctx.textAlign = 'end'

    const textX = 30
    const lineStartY = 35
    const line1StartX = 50
    const lineLength = 80
    const line2StartX = line1StartX + lineLength + 20

    for (let i = 1; i <= 10; i++) {
      let y = lineStartY * i

      ctx.fillText(`${i}px`, textX, y + 3)

      ctx.beginPath()
      ctx.lineWidth = i
      ctx.moveTo(line1StartX, y)
      ctx.lineTo(line1StartX + lineLength, y)
      ctx.stroke()

      if (y % 2 === 1)
        y = truncTo05(y)
      ctx.beginPath()
      ctx.lineWidth = i
      ctx.moveTo(line2StartX, y)
      ctx.lineTo(line2StartX + lineLength, y)
      ctx.stroke()
    }

    return () => {

    }
  }, [])

  return (
    <div className={s.container}>
      <canvas className={s.canvas} width={width} height={height} ref={refCanvas}/>
    </div>
  );
}
