import React, {useEffect, useRef, useState} from 'react'
import {WrapElementHandler} from '../../../../interactive'
import {EventInfo} from '../../../component'
import s from './TransformCanvas.module.css'
import {Item} from './Item/Item'

export const TransformCanvas = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [wrapHandler, setWrapHandler] = useState<WrapElementHandler | null>(null)

  useEffect(() => {
    const wrapHandler = new WrapElementHandler(ref.current as HTMLDivElement)
    setWrapHandler(wrapHandler)
    return () => {
      wrapHandler.stop()
    }
  }, [])

  return (
    <div className={s.container} ref={ref}>
      {wrapHandler && <Item wrapHandler={wrapHandler}/>}
      {wrapHandler && <EventInfo element={ref.current as any} rectHandler={wrapHandler.rectHandler}/>}
    </div>
  );
}
