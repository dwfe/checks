import React from 'react'
import {IRoutableProps, useDocumentTitle} from '../../routing'
import {Timers} from '../../components/Timers';
import {AboutEventLoop} from './AboutEventLoop/AboutEventLoop';
import {WhatFreezesTheEventLoop} from './WhatFreezesTheEventLoop/WhatFreezesTheEventLoop';

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
