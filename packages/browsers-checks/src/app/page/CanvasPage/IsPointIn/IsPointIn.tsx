import {animationFrame, delay, tap} from '@do-while-for-each/rxjs'
import React, {useEffect, useRef, useState} from 'react'
import {WrapElementHandler} from '../../../../interactive'
import {EventInfo} from '../../../component'
import s from './IsPointIn.module.css'
import {drawGrid} from '../common'
import {Info} from './Info/Info'

const width = 501
const height = 851
const containerSizes = {width: `${width}px`, height: `${height}px`}

export function IsPointIn() {
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const refCanvasOverlay = useRef<HTMLCanvasElement>(null)
  const [wrapHandler, setWrapHandler] = useState<WrapElementHandler | null>(null)
  const [infoForPath, setInfoForPath] = useState({inPath: false, inStroke: false})
  const [infoForRect, setInfoForRect] = useState({inPath: false, inStroke: false})
  const [infoForArrow, setInfoForArrow] = useState({inPath: false, inStroke: false})
  const [infoForCircle, setInfoForCircle] = useState({inPath: false, inStroke: false})

  useEffect(() => {
    const canvas = refCanvas.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const canvasOverlay = refCanvasOverlay.current as HTMLCanvasElement
    const ctxOverlay = canvasOverlay.getContext('2d') as CanvasRenderingContext2D
    drawGrid(ctxOverlay, {from: 0, step: 10, to: width}, {from: 0, step: 10, to: height}, 'rgba(255,255,0,0.5)')

    const wrapElementHandler = new WrapElementHandler(canvas)
    setWrapHandler(wrapElementHandler)

    ctx.lineWidth = 28
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'rgba(135,206,235,0.55)'

    const pathPath = new Path2D()
    pathPath.moveTo(50, 50)
    pathPath.lineTo(300, 50)
    pathPath.lineTo(300, 210)
    pathPath.lineTo(50, 210)
    pathPath.lineTo(50, 50)
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

    ctx.lineWidth = 2
    const pathArrow = new Path2D()
    pathArrow.moveTo(40, 580)
    pathArrow.lineTo(320, 520)
    pathArrow.lineTo(260, 500)
    pathArrow.moveTo(320, 520)
    pathArrow.lineTo(275, 565)
    ctx.stroke(pathArrow)

    const pathCircle = new Path2D()
    pathCircle.arc(180, 720, 85.5, 0, 2 * Math.PI, false)
    ctx.stroke(pathCircle)

    const mouseMoveSubscription = wrapElementHandler.position$.pipe(
      delay(0, animationFrame),
      tap(event => {
        const [x, y] = wrapElementHandler.rectHandler.pagePointFromEvent(event)
        setInfoForPath({inPath: ctx.isPointInPath(pathPath, x, y), inStroke: ctx.isPointInStroke(pathPath, x, y)})
        setInfoForRect({inPath: ctx.isPointInPath(pathRect, x, y), inStroke: ctx.isPointInStroke(pathRect, x, y)})
        setInfoForArrow({inPath: ctx.isPointInPath(pathArrow, x, y), inStroke: ctx.isPointInStroke(pathArrow, x, y)})
        setInfoForCircle({inPath: ctx.isPointInPath(pathCircle, x, y), inStroke: ctx.isPointInStroke(pathCircle, x, y)})
      }),
    ).subscribe()

    return () => {
      wrapElementHandler.stop()
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
      <div className={s.infoForArrow}>
        <Info inStroke={infoForArrow.inStroke} inPath={infoForArrow.inPath}/>
      </div>
      <div className={s.infoForCircle}>
        <Info inStroke={infoForCircle.inStroke} inPath={infoForCircle.inPath}/>
      </div>
      <div className={s.result}>
        <ol>
          <li>Если фигур нарисовано больше одной, то для корректной работы приходится использовать Path2D</li>
          <li>Если толщина обводки больше 1px, то надо помнить, что толщина обводки увеличивается симметрично как внутрь, так и наружу контура</li>
          <li>Если на холсте фигуры с разной толщиной обводки, то все контуры начнут детектиться как будто у всех фигур обводка толщиной как самая малая</li>
        </ol>
      </div>
    </div>
  )
}
