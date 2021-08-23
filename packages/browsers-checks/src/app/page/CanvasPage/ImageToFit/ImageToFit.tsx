import React, {useState} from 'react'
import {FileOpen} from '../../../component'
import s from './ImageToFit.module.css'
import {Canvas} from './Canvas/Canvas'

export function ImageToFit() {
  const [image, setImage] = useState<HTMLImageElement>()

  const fileHandler = (file: File) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.src = url
    img.onload = function () {
      URL.revokeObjectURL(url)
      setImage(img)
    }
  }

  return (
    <div className={s.container}>
      <FileOpen onOpen={fileHandler}/>
      {image && <Canvas image={image}/>}
    </div>
  )
}
