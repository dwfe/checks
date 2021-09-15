import {TPoint, WebMatrix} from '@do-while-for-each/math'
import React, {useEffect, useRef} from 'react'
import {drawGrid, truncTo05} from '../../CanvasPage/common'
import s from './ToNewCoordinateSystem.module.css'

const width = 421
const height = 501

const block = {
  topLeftY: 35,
  height: 175,
  topIndent: 15,
  bottomIndent: 45,
}
const block2 = {
  topLeftY: block.topLeftY + block.height + 35,
  height: 230,
  topIndent: 20,
  bottomIndent: 5,
}
type TBlock = typeof block

export function ToNewCoordinateSystem() {
  const refCanvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = refCanvas.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.clearRect(0, 0, width, height)

    drawGrid(ctx, {from: 0, step: 10, to: width}, {from: 0, step: 10, to: height})
    drawStaticLines(ctx, block)
    drawStaticLines(ctx, block2)
    drawGraph(ctx, block)
    drawGraph(ctx, block2)
  }, [])

  return (
    <div className={s.container}>
      <canvas className={s.canvas} width={width} height={height} ref={refCanvas}/>
    </div>
  );
}


function drawGraph(ctx: CanvasRenderingContext2D, block: TBlock) {

  const valueToPixel = WebMatrix.toNewCoordinateSystem(
    {fromSegment: 30, toSegment: 30 * 14},
    {fromSegment: 15, toSegment: block.height - (block.topIndent + block.bottomIndent)},
    {fromPoint: [0, 0], toPoint: [0, block.bottomIndent]}
  );

  const dotsValue: TPoint[] = [
    [0, 0],
    [14, 15],
    [23, 0],
    [30, 15]
  ]

  const dotsPixel: TPoint[] = dotsValue.reduce((acc, p) => {
    const p1 = WebMatrix.apply(valueToPixel, p)
    p1[1] = (block.height + block.topLeftY) - p1[1] // перевернуть график, т.к. ось Y в браузере направлена вниз
    acc.push(p1)
    return acc
  }, [] as TPoint[])

  ctx.strokeStyle = '#2a7107'
  ctx.lineWidth = 3
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
