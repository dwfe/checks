import {useDocumentTitle} from '@do-while-for-each/browser-router-react-tools'
import React from 'react'
import {WhatFreezesTheEventLoop} from './WhatFreezesTheEventLoop/WhatFreezesTheEventLoop'
import {AboutEventLoop} from './AboutEventLoop/AboutEventLoop'
import {Timers} from '../../components/Timers'
import {IRoutableProps} from '../../../router'

export const EventLoopPage = (props: IRoutableProps) => {
  useDocumentTitle(props)

  return (
    <>
      <Timers/>
      {/*<Timers2 count={'1'} interval={'0.5'}/>*/}
      <AboutEventLoop/>
      <WhatFreezesTheEventLoop/>
    </>
  );
}
