import React, {useEffect, useRef} from 'react'
import s from './CrispLine.module.css'

const width = 500
const height = 500
const containerSizes = {width: `${width}px`, height: `${height}px`}

export function CrispLine() {
  const refCanvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = refCanvas.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    ctx.strokeStyle = 'black'

    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.moveTo(20,20)
    ctx.lineTo(20,100)
    ctx.stroke()

    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.moveTo(40,20)
    ctx.lineTo(40,100)
    ctx.stroke()

    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.moveTo(60,20)
    ctx.lineTo(60,100)
    ctx.stroke()

    ctx.beginPath()
    ctx.lineWidth = 4
    ctx.moveTo(80,20)
    ctx.lineTo(80,100)
    ctx.stroke()

    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.moveTo(100,20)
    ctx.lineTo(100,100)
    ctx.stroke()


    return () => {

    }
  }, [])

  return (
    <div className={s.container}>
      <canvas className={s.canvas} width={width} height={height} ref={refCanvas}/>
    </div>
  );
}
