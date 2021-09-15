import {TPoint, TWebMatrix, WebMatrix} from '@do-while-for-each/math'
import React, {useEffect, useRef} from 'react'
import {drawGrid, truncTo05} from '../../CanvasPage/common'
import s from './ToNewCoordinateSystem.module.css'

const width = 421
const height = 251

const block = {
  topLeftY: 15,
  height: 175,
  topIndent: 32,
  bottomIndent: 45,
}
type TBlock = typeof block

export function ToNewCoordinateSystem() {
  const refCanvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = refCanvas.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.clearRect(0, 0, width, height)

    const valueToPixel = WebMatrix.toNewCoordinateSystem(
      {fromSegment: 30, toSegment: 30 * 14},
      {fromSegment: 15, toSegment: block.height - (block.topIndent + block.bottomIndent)},
      {fromPoint: [0, 0], toPoint: [0, block.topLeftY + block.topIndent]}
    );

    drawGrid(ctx, {from: 0, step: 10, to: width}, {from: 0, step: 10, to: height})
    drawStaticLines(ctx, block)
    drawGraph(ctx, valueToPixel)
  }, [])

  return (
    <div className={s.container}>
      <canvas className={s.canvas} width={width} height={height} ref={refCanvas}/>
    </div>
  );
}

function drawGraph(ctx: CanvasRenderingContext2D, valueToPixel: TWebMatrix) {
  const dotsValue: TPoint[] = [
    [0, 0],
    [14, 15],
    [23, 0],
    [30, 15]
  ]
  const maxY = dotsValue.reduce((max, [, y]) => y > max ? y : max, Number.MIN_SAFE_INTEGER)
  dotsValue.forEach(p => {
    p[1] = maxY - p[1]
  })

  const dotsPixel: TPoint[] = dotsValue.reduce((acc, p) => {
    acc.push(WebMatrix.apply(valueToPixel, p))
    return acc
  }, [] as TPoint[])

  ctx.strokeStyle = '#ff00ae'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(...dotsPixel[0])
  for (let i = 1; i < dotsPixel.length; i++) {
    ctx.lineTo(...dotsPixel[i])
    ctx.stroke()
  }
}

function drawStaticLines(ctx: CanvasRenderingContext2D, block: TBlock) {
  ctx.strokeStyle = '#0000ff'
  ctx.lineWidth = 2

  let y = block.topLeftY // Верхняя синяя черта блока чарта
  ctx.beginPath()
  ctx.moveTo(0, y)
  ctx.lineTo(width, y)
  ctx.stroke()

  y = block.topLeftY + block.height       // Нижняя синяя черта блока чарта
  ctx.beginPath()
  ctx.moveTo(0, y)
  ctx.lineTo(width, y)
  ctx.stroke()


  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 1

  y = truncTo05(block.topLeftY + block.topIndent) // Верхняя граница области данных
  ctx.beginPath()
  ctx.moveTo(0, y)
  ctx.lineTo(width, y)
  ctx.stroke()

  y = truncTo05(block.topLeftY + block.height - block.bottomIndent) // Нижняя граница области данных
  ctx.beginPath()
  ctx.moveTo(0, y)
  ctx.lineTo(width, y)
  ctx.stroke()

}
