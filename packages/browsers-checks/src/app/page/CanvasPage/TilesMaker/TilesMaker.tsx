import React, {useState} from 'react'
import s from './TilesMaker.module.css'
import {Canvas} from './Canvas/Canvas'

export function TilesMaker() {
  const [image, setImage] = useState<HTMLImageElement>()

  const fileHandler = (event) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.src = url
      img.onload = function () {
        URL.revokeObjectURL(url)
        setImage(img)
      }
    }
  }

  return (
    <div className={s.container}>
      <input type="file" onChange={fileHandler}/>
      {image && <Canvas image={image}/>}
    </div>
  )
}
