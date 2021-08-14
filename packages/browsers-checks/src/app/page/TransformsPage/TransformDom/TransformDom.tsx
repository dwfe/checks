import React, {useEffect, useRef, useState} from 'react'
import {WebMatrix} from '@do-while-for-each/math'
import {EventInfo, TransformMe} from '../../../component'
import {WrapElementHandler} from '../../../../interactive'
import s from './TransformDom.module.css'

export function TransformDom() {
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
      {wrapHandler && <TransformMe wrapHandler={wrapHandler} startTransform={WebMatrix.of().translate(50, 120).rotate(-10).toJSON()}/>}
      {wrapHandler && <EventInfo element={ref.current as any} rectHandler={wrapHandler.rectHandler}/>}
    </div>
  );
}
