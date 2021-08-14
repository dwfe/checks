import {useDocumentTitle} from '@do-while-for-each/browser-router-react-tools'
import React, {useEffect, useRef, useState} from 'react'
import {WebMatrix} from '@do-while-for-each/math'
import {WhatFreezesTheEventLoop} from './WhatFreezesTheEventLoop/WhatFreezesTheEventLoop'
import {InteractiveVariant, WrapElementHandler} from '../../../interactive'
import {AboutEventLoop} from './AboutEventLoop/AboutEventLoop'
import {Timer, TransformMe} from '../../component'
import {IRoutableProps} from '../../../router'
import s from './EventLoopPage.module.css'

export const EventLoopPage = (props: IRoutableProps) => {
  useDocumentTitle(props)
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
      {wrapHandler && <TransformMe wrapHandler={wrapHandler}
                                   startTransform={WebMatrix.of().translate(500, 0).toJSON()}
                                   variants={[InteractiveVariant.DRAG, InteractiveVariant.ROTATE]}
                                   textInactive={'Transform Me'}
      />}
      <Timer/>
      {/*<Timer2 count={'1'} interval={'0.5'}/>*/}
      <AboutEventLoop/>
      <WhatFreezesTheEventLoop/>
    </div>
  );
}
