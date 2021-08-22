import React, {useEffect, useRef} from 'react'
import s from './Canvas.module.css'

const width = 800
const height = 600

export function Canvas({image}: IProps) {
  const refCanvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = refCanvas.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.clearRect(0, 0, width, height)

    const {dx, dy, dw, dh} = drawParamsToFitImage({width, height}, {width: image.naturalWidth, height: image.naturalHeight})
    ctx.drawImage(image, dx, dy, dw, dh)
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


interface ILinearSizes {
  width: number;
  height: number;
}

function drawParamsToFitImage(canvas: ILinearSizes, image: ILinearSizes): { dx: number; dy: number; dw: number; dh: number; } {
  const aspectRatioCanvas = canvas.width / canvas.height
  const aspectRatioImage = image.width / image.height
  let dx = 0
  let dy = 0
  let dw = canvas.width
  let dh = canvas.height
  if (aspectRatioCanvas > aspectRatioImage) { // ТОГДА высота на весь канвас
    dw = aspectRatioImage * dh
    dx = (canvas.width - dw) / 2
  } else if (aspectRatioCanvas < aspectRatioImage) { // ТОГДА ширина на весь канвас
    dh = dw / aspectRatioImage
    dy = (canvas.height - dh) / 2
  }
  return {dx, dy, dw, dh}
}
