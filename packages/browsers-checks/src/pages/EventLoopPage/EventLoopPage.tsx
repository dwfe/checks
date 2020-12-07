import React from 'react'
import {AboutEventLoop} from './AboutEventLoop'
import {IRoutableProps, useDocumentTitle} from '../../routing'
import {WhatFreezesTheEventLoop} from './WhatFreezesTheEventLoop';
import {Timers} from '../../components/Timers';

export const EventLoopPage = (props: IRoutableProps) => {
  useDocumentTitle(props)

  return (
    <>
      <Timers/>
      <AboutEventLoop/>
      <WhatFreezesTheEventLoop/>
    </>
  );
}
