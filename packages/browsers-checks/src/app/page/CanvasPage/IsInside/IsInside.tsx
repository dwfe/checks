import React, {useEffect, useRef} from 'react'
import {tap} from '@do-while-for-each/rxjs';
import {WrapHandler} from '../../../../interactive'

export function IsInside() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const handler = new WrapHandler(canvas)

    ctx.lineWidth = 14
    ctx.fillStyle = 'rgba(255,200,0,0.5)';

    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(280, 20);
    ctx.lineTo(280, 180);
    ctx.lineTo(20, 180);
    ctx.lineTo(20, 20);
    ctx.closePath()
    ctx.stroke()
    ctx.fill()

    const mouseMoveSubscription = handler.position$.pipe(
      tap(event => {
        const [x, y] = handler.rectHandler.pagePointFromEvent(event)
        console.log(`in path`, ctx.isPointInPath(x, y), `in stroke`, ctx.isPointInStroke(x, y))
      }),
    ).subscribe()

    return () => {
      handler.stop()
      mouseMoveSubscription.unsubscribe()
    }
  }, [])


  return (
    <div>
      <canvas width={500} height={500} ref={ref}/>
    </div>
  )
}
