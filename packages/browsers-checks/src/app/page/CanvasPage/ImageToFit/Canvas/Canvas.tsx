import React, {useEffect, useRef} from 'react'
import {drawParamsToFitImage} from './drawParamsToFit'
import s from './Canvas.module.css'

const width = 800
const height = 600

export function Canvas({image}: IProps) {
  const refCanvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = refCanvas.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(image, ...drawParamsToFitImage({width, height}, {width: image.naturalWidth, height: image.naturalHeight}))
  }, [image])

  return (
    <div className={s.container}>
      <canvas className={s.canvas} width={width} height={height} ref={refCanvas}/>
    </div>
  )
}

interface IProps {
  image: HTMLImageElement;
}
