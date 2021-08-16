import React, {useEffect, useRef} from 'react'
import {truncTo05} from '../../common'
import s from './AxisX.module.css'

const width = 500
const height = 210

export function AxisX() {
  const refCanvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = refCanvas.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    ctx.strokeStyle = 'black'
    ctx.font = '10px Verdana'
    ctx.fillStyle = 'blue'

    const textY = 10
    const lineStartX = 45
    const line1StartY = 20
    const lineLength = 80
    const line2StartY = line1StartY + lineLength + 20

    for (let i = 1; i <= 10; i++) {
      let x = lineStartX * i

      ctx.fillText(`${i}px`, x - 10, textY)

      ctx.beginPath()
      ctx.lineWidth = i
      ctx.moveTo(x, line1StartY)
      ctx.lineTo(x, line1StartY + lineLength)
      ctx.stroke()

      if (x % 2 === 1)
        x = truncTo05(x)
      ctx.beginPath()
      ctx.lineWidth = i
      ctx.moveTo(x, line2StartY)
      ctx.lineTo(x, line2StartY + lineLength)
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
