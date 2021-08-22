import React, {useEffect, useRef} from 'react'

export function Canvas({image}: IProps) {
  const refCanvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = refCanvas.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.drawImage(image, 0, 0, 800, 600)
  }, [image])

  return (
    <canvas width="800" height="600" ref={refCanvas}/>
  )
}

interface IProps {
  image: CanvasImageSource;
}
