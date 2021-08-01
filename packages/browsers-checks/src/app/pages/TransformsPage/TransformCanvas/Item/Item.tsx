import {animationFrame, delay, startWith, tap} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import React, {useEffect, useRef} from 'react'
import {ElementHandler, ElementInteractive, WrapHandler} from '../../../../../interactive'
import s from './Item.module.css'

export const Item = ({wrapHandler}: IProps) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    console.log(`hello`, )
    const canvas = ref.current as HTMLCanvasElement
    const {width, height} = canvas

    const rectWidth = 100
    const rectHeight = 50
    const offeset = 20
    const count = 100

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const handler = new ElementHandler(canvas, wrapHandler)
    const interactive = new ElementInteractive(
      handler,
      WebMatrix.of().translate(50, 120).rotate(-10).toJSON()
    )

    interactive.resultMatrix$.pipe(
      startWith(WebMatrix.identity()),
      delay(0, animationFrame),
      tap(m => {
        ctx.setTransform()
        ctx.clearRect(0, 0, width, height)
        ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5])
        for (let j = 0; j < count; j++) {
          for (let i = 0; i < count; i++) {
            ctx.strokeRect(i*rectWidth + i*offeset, j*rectHeight + j*offeset, rectWidth, rectHeight)
          }
        }
        // ctx.strokeRect(0, 0, width * 0.3, height * 0.3)
        ctx.fill()
      })
    ).subscribe()


  }, [wrapHandler])

  return (
    <canvas width={1200} height={600} className={s.container} ref={ref}/>
  )
}

interface IProps {
  wrapHandler: WrapHandler;
}
