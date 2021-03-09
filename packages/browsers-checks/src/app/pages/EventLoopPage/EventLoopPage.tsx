import {useDocumentTitle} from '@do-while-for-each/browser-router-react-tools'
import React from 'react'
import {WhatFreezesTheEventLoop} from './WhatFreezesTheEventLoop/WhatFreezesTheEventLoop'
import {AboutEventLoop} from './AboutEventLoop/AboutEventLoop'
import {Timer} from '../../components/timers'
import {IRoutableProps} from '../../../router'

export const EventLoopPage = (props: IRoutableProps) => {
  useDocumentTitle(props)

  return (
    <>
      <Timer/>
      {/*<Timer2 count={'1'} interval={'0.5'}/>*/}
      <AboutEventLoop/>
      <WhatFreezesTheEventLoop/>
    </>
  );
}
