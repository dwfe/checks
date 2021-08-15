import {animationFrame, delay, tap} from '@do-while-for-each/rxjs'
import React, {useEffect, useRef, useState} from 'react'
import {WrapElementHandler} from '../../../../interactive'
import {EventInfo} from '../../../component'
import s from './IsPointIn.module.css'
import {Info} from './Info/Info'

const width = 500;
const height = 700;
const containerSizes = {width: `${width}px`, height: `${height}px`}

export function IsPointIn() {
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const refCanvasOverlay = useRef<HTMLCanvasElement>(null)
  const [wrapHandler, setWrapHandler] = useState<WrapElementHandler | null>(null)
  const [infoForPath, setInfoForPath] = useState({inPath: false, inStroke: false})
  const [infoForRect, setInfoForRect] = useState({inPath: false, inStroke: false})

  useEffect(() => {
    const canvas = refCanvas.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const canvasOverlay = refCanvasOverlay.current as HTMLCanvasElement
    const ctxOverlay = canvasOverlay.getContext('2d') as CanvasRenderingContext2D
    drawGrid(ctxOverlay, {from: 0, step: 10, to: width}, {from: 0, step: 10, to: height})

    const wrapHandler = new WrapElementHandler(canvas)
    setWrapHandler(wrapHandler)

    ctx.lineWidth = 28
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'rgba(135,206,235,0.55)'

    const pathPath = new Path2D()
    pathPath.moveTo(50, 50);
    pathPath.lineTo(300, 50);
    pathPath.lineTo(300, 210);
    pathPath.lineTo(50, 210);
    pathPath.lineTo(50, 50);
    pathPath.closePath()
    ctx.stroke(pathPath)
    ctx.fill(pathPath)

    const pathRect = new Path2D()
    pathRect.rect(50, 270, 250, 160)
    ctx.stroke(pathRect)
    ctx.fill(pathRect)

    ctxOverlay.font = '20px Verdana'
    ctxOverlay.fillStyle = 'blue'
    ctxOverlay.fillText('by Path', 130, 135)
    ctxOverlay.fillText('by Rect', 130, 360)

    const mouseMoveSubscription = wrapHandler.position$.pipe(
      delay(0, animationFrame),
      tap(event => {
        const [x, y] = wrapHandler.rectHandler.pagePointFromEvent(event)
        setInfoForPath({inPath: ctx.isPointInPath(pathPath, x, y), inStroke: ctx.isPointInStroke(pathPath, x, y)})
        setInfoForRect({inPath: ctx.isPointInPath(pathRect, x, y), inStroke: ctx.isPointInStroke(pathRect, x, y)})
      }),
    ).subscribe()

    return () => {
      wrapHandler.stop()
      mouseMoveSubscription.unsubscribe()
    }
  }, [])

  return (
    <div className={s.container} style={containerSizes}>
      <canvas className={s.canvas} width={width} height={height} ref={refCanvas}/>
      <canvas className={s.canvasOverlay} width={width} height={height} ref={refCanvasOverlay}/>
      {refCanvas?.current && wrapHandler && <EventInfo element={refCanvas.current as any} rectHandler={wrapHandler.rectHandler}/>}
      <div className={s.infoForPath}>
        <Info inStroke={infoForPath.inStroke} inPath={infoForPath.inPath}/>
      </div>
      <div className={s.infoForRect}>
        <Info inStroke={infoForRect.inStroke} inPath={infoForRect.inPath}/>
      </div>
      <div className={s.result}>
        <ol>
          <li>Если фигур нарисовано больше одной, то для корректной работы приходится использовать Path2D</li>
          <li>Если толщина обводки больше 1px, то надо помнить, что толщина обводки увеличивается симметрично как внутрь, так и наружу контура</li>
        </ol>
      </div>
    </div>
  )
}

function drawGrid(ctx: CanvasRenderingContext2D, xGrid: IGridData, yGrid: IGridData) {
  ctx.lineWidth = 1
  ctx.strokeStyle = 'rgba(255,255,0,0.5)'

  //x
  for (let i = xGrid.from; i <= xGrid.to; i += xGrid.step) {
    const pos = truncTo05(i)
    ctx.beginPath();
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, yGrid.to);
    ctx.stroke()
  }

  //y
  for (let i = yGrid.from; i <= yGrid.to; i += yGrid.step) {
    const pos = truncTo05(i)
    ctx.beginPath();
    ctx.moveTo(0, pos);
    ctx.lineTo(xGrid.to, pos);
    ctx.stroke()
  }
}

interface IGridData {
  from: number;
  to: number;
  step: number;
}

const truncTo05 = (x: number): number => Math.trunc(x) + 0.5;
