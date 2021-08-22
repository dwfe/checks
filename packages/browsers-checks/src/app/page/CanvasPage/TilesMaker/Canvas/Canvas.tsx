import React, {useEffect, useRef} from 'react'
import s from './Canvas.module.css'

export function Canvas({image}: IProps) {
  const refCanvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = refCanvas.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.drawImage(image, 0, 0, 800, 600)
  }, [image])

  return (
    <div className={s.container}>
      <canvas  className={s.canvas} width="800" height="600" ref={refCanvas}/>
    </div>
  )
}

interface IProps {
  image: CanvasImageSource;
}
