import {animationFrame, delay, tap} from '@do-while-for-each/rxjs'
import React, {useEffect, useRef, useState} from 'react'
import {WrapHandler} from '../../../../interactive'
import {EventInfo} from '../../../component'
import s from './IsInside.module.css'

export function IsInside() {
  const refWrap = useRef<HTMLDivElement>(null)
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const refCanvasOverlay = useRef<HTMLCanvasElement>(null)
  const [wrapHandler, setWrapHandler] = useState<WrapHandler | null>(null)
  const [info, setInfo] = useState({inPath: false, inStroke: false})

  useEffect(() => {
    const canvas = refCanvas.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const canvasOverlay = refCanvasOverlay.current as HTMLCanvasElement
    const ctxOverlay = canvasOverlay.getContext('2d') as CanvasRenderingContext2D
    drawGrid(ctxOverlay)

    const handler = new WrapHandler(canvas)
    setWrapHandler(handler)

    ctx.lineWidth = 14
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'rgba(255,200,0,0.7)'

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 250);
    ctx.lineTo(50, 250);
    ctx.lineTo(50, 50);
    ctx.closePath()
    ctx.stroke()
    ctx.fill()

    const mouseMoveSubscription = handler.position$.pipe(
      delay(0, animationFrame),
      tap(event => {
        const [x, y] = handler.rectHandler.pagePointFromEvent(event)
        setInfo({inPath: ctx.isPointInPath(x, y), inStroke: ctx.isPointInStroke(x, y)})
      }),
    ).subscribe()

    return () => {
      handler.stop()
      mouseMoveSubscription.unsubscribe()
    }
  }, [])


  return (
    <div className={s.container} style={{width: '500px', height: '500px'}}
         ref={refWrap}>
      <canvas className={s.canvas} width={500} height={500}
              ref={refCanvas}/>
      <canvas className={s.canvasOverlay} width={500} height={500}
              ref={refCanvasOverlay}/>
      {refCanvas?.current && wrapHandler && <EventInfo element={refCanvas.current as any} rectHandler={wrapHandler.rectHandler}/>}
      <div className={s.info}>
        <span><b>{`${info.inPath}`}</b> in path&nbsp;&nbsp;&nbsp;</span><br/>
        <span><b>{`${info.inStroke}`}</b> in stroke&nbsp;</span>
      </div>
    </div>
  )
}

function drawGrid(ctx: CanvasRenderingContext2D,) {
  ctx.lineWidth = 1
  ctx.strokeStyle = 'rgba(255,21,0,0.3)'

  //y
  for (let i = 0.5; i < 500; i = i + 10) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(500, i);
    ctx.stroke()
  }
  ctx.beginPath();
  ctx.moveTo(0, 499.5);
  ctx.lineTo(500, 499.5);
  ctx.stroke()

  //x
  for (let i = 0.5; i <= 500; i += 10) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 500);
    ctx.stroke()
  }
  ctx.beginPath();
  ctx.moveTo(499.5, 0);
  ctx.lineTo(499.5, 500);
  ctx.stroke()

}
