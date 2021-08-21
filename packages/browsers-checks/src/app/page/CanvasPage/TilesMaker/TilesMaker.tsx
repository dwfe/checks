import React, {useRef} from 'react'
import s from './TilesMaker.module.css'

export function TilesMaker() {
  const refCanvas = useRef<HTMLCanvasElement>(null)

  const fileHandler = (event) => {
    const canvas = refCanvas.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const img = new Image();
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    img.src = imageUrl
    img.onload = function () {
      URL.revokeObjectURL(imageUrl)
      ctx.drawImage(img, 0, 0, 800, 600);
    }
  }

  return (
    <div className={s.container}>
      <input type="file" onChange={fileHandler}/>
      <canvas width="800" height="600" ref={refCanvas}/>
    </div>
  )
}
