import {animationFrame, combineLatest, debounceTime, delay, tap} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import React, {useEffect, useRef} from 'react'
import {InnerElementHandler, InnerElementInteractive, WrapElementHandler} from '../../../../../interactive'
import s from './Item.module.css'

export const Item = ({wrapHandler}: IProps) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const boxWidth = 100
    const boxHeight = 50
    const boxOffset = 20
    const count = 100

    const handler = new InnerElementHandler(canvas, wrapHandler)
    const interactive = new InnerElementInteractive(
      handler,
      WebMatrix.of().translate(50, 120).rotate(-10).toJSON()
    )

    const canvasSizes$ = wrapHandler.rectHandler.rect$.pipe(
      debounceTime(10),
      tap(({width, height}) => {
        canvas.setAttribute('width', `${width}`)
        canvas.setAttribute('height', `${height}`)
      }),
    )

    const drawSubscription = combineLatest([
      interactive.resultMatrix$,
      canvasSizes$,
    ]).pipe(
      delay(0, animationFrame),
      tap(([m, canvasSizes]) => {
        ctx.resetTransform()
        ctx.clearRect(0, 0, canvasSizes.width, canvasSizes.height)
        ctx.transform(...m)
        for (let j = 0; j < count; j++) {
          for (let i = 0; i < count; i++) {
            ctx.strokeRect(i * boxWidth + i * boxOffset, j * boxHeight + j * boxOffset, boxWidth, boxHeight)
          }
        }
        // ctx.strokeRect(0, 0, width * 0.3, height * 0.3)
        ctx.fill()
      })
    ).subscribe()

    return () => {
      handler.stop()
      interactive.stop()
      drawSubscription.unsubscribe()
    }
  }, [wrapHandler])

  return (
    <canvas className={s.container} ref={ref}/>
  )
}

interface IProps {
  wrapHandler: WrapElementHandler;
}
