import React from 'react'
import s from './FileOpen.module.css'

export function FileOpen({onOpen}: IProps) {

  const fileHandler = (event) => {
    const file = event.target.files && event.target.files[0]
    if (file)
      onOpen(file)
  }

  return (
    <div className={s.container}>
      <input type="file" onChange={fileHandler}/>
    </div>
  )
}

interface IProps {
  onOpen: (file: File) => void;
}
