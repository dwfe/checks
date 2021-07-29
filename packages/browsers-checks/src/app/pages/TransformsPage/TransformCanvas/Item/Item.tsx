import React, {useRef} from 'react'
import {WrapHandler} from '../../../../../interactive'
import s from './Item.module.css'

export const Item = ({wrapHandler}: IProps) => {
  const ref = useRef<HTMLCanvasElement>(null)

  return (
    <canvas className={s.container} ref={ref}/>
  )
}

interface IProps {
  wrapHandler: WrapHandler;
}
