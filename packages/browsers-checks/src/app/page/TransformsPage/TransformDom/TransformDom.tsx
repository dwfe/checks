import React, {useEffect, useRef, useState} from 'react'
import {WebMatrix} from '@do-while-for-each/math'
import {TransformMe} from '../../../component/TransformMe/TransformMe'
import {EventInfo} from '../common/EventInfo/EventInfo'
import {WrapHandler} from '../../../../interactive'
import s from './TransformDom.module.css'

export function TransformDom() {
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
      {wrapHandler && <TransformMe wrapHandler={wrapHandler} startTransform={WebMatrix.of().translate(50, 120).rotate(-10).toJSON()}/>}
      {wrapHandler && <EventInfo element={ref.current as any} rectHandler={wrapHandler.rectHandler}/>}
    </div>
  );
}
