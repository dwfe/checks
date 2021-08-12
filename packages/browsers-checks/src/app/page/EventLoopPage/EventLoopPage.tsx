import {useDocumentTitle} from '@do-while-for-each/browser-router-react-tools'
import React, {useEffect, useRef, useState} from 'react'
import {WebMatrix} from '@do-while-for-each/math'
import {WhatFreezesTheEventLoop} from './WhatFreezesTheEventLoop/WhatFreezesTheEventLoop'
import {InteractiveVariant, WrapHandler} from '../../../interactive'
import {TransformMe} from '../../component/TransformMe/TransformMe'
import {AboutEventLoop} from './AboutEventLoop/AboutEventLoop'
import {IRoutableProps} from '../../../router'
import {Timer} from '../../component/timers'
import s from './EventLoopPage.module.css'

export const EventLoopPage = (props: IRoutableProps) => {
  useDocumentTitle(props)
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
      {wrapHandler && <TransformMe wrapHandler={wrapHandler}
                                   startTransform={WebMatrix.of().translate(500, 0).toJSON()}
                                   variants={[InteractiveVariant.DRAG]}
                                   textInactive={'Transform Me'}
      />}
      <Timer/>
      {/*<Timer2 count={'1'} interval={'0.5'}/>*/}
      <AboutEventLoop/>
      <WhatFreezesTheEventLoop/>
    </div>
  );
}
