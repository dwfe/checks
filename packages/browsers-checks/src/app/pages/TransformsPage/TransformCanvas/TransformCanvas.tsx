import React, {useEffect, useRef, useState} from 'react'
import {EventInfo} from '../common/EventInfo/EventInfo'
import {WrapHandler} from '../../../../interactive'
import s from './TransformCanvas.module.css'
import {Item} from './Item/Item'

export const TransformCanvas = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [wrapHandler, setWrapHandler] = useState<WrapHandler | null>(null)

  useEffect(() => {
    const handler = new WrapHandler(ref.current as HTMLDivElement)
    setWrapHandler(handler)
    return () => {
      handler.stop()
    }
  }, [])

  return (
    <div className={s.container} ref={ref}>
      {wrapHandler && <Item wrapHandler={wrapHandler}/>}
      {wrapHandler && <EventInfo element={ref.current as any} rectHandler={wrapHandler.rectHandler}/>}
    </div>
  );
}
